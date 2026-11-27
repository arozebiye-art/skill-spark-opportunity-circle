import { useNavigate } from "@tanstack/react-router";
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";

import type { Experience, Role } from "@/lib/data";

export type SessionUser = {
  name: string;
  email: string;
  role: Role;
  headline: string;
  location: string;
  about: string;
  skills: string[];
  experience: Experience[];
};

type SessionValue = {
  user: SessionUser | null;
  signIn: (user: SessionUser) => void;
  signOut: () => void;
  updateUser: (patch: Partial<SessionUser>) => void;
  connections: string[];
  toggleConnection: (id: string) => void;
  applied: string[];
  apply: (id: string) => void;
  saved: string[];
  toggleSaved: (id: string) => void;
  mentorRequests: string[];
  requestMentor: (id: string) => void;
};

const SessionContext = createContext<SessionValue | null>(null);

const toggle = (list: string[], id: string) =>
  list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
const add = (list: string[], id: string) => (list.includes(id) ? list : [...list, id]);

// Demo session: kept in memory for the visit only. Replace with real accounts when the user asks.
export function SessionProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [connections, setConnections] = useState<string[]>([]);
  const [applied, setApplied] = useState<string[]>([]);
  const [saved, setSaved] = useState<string[]>([]);
  const [mentorRequests, setMentorRequests] = useState<string[]>([]);

  const value = useMemo<SessionValue>(
    () => ({
      user,
      signIn: setUser,
      signOut: () => {
        setUser(null);
        setConnections([]);
        setApplied([]);
        setSaved([]);
        setMentorRequests([]);
      },
      updateUser: (patch) => setUser((u) => (u ? { ...u, ...patch } : u)),
      connections,
      toggleConnection: (id) => setConnections((l) => toggle(l, id)),
      applied,
      apply: (id) => setApplied((l) => add(l, id)),
      saved,
      toggleSaved: (id) => setSaved((l) => toggle(l, id)),
      mentorRequests,
      requestMentor: (id) => setMentorRequests((l) => add(l, id)),
    }),
    [user, connections, applied, saved, mentorRequests],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used inside SessionProvider");
  return ctx;
}

/** Returns a check that sends signed-out visitors to the sign-in page. */
export function useRequireSignIn() {
  const { user } = useSession();
  const navigate = useNavigate();
  return useCallback(
    (action: string) => {
      if (user) return true;
      toast.info(`Sign in to ${action}`);
      void navigate({ to: "/login" });
      return false;
    },
    [user, navigate],
  );
}
