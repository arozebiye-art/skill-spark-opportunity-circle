import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { AuthShell, DemoNote, FieldError } from "@/components/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "@/hooks/use-session";
import { LOCATIONS, ROLES, type Role } from "@/lib/data";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create your account – TalentLink" },
      {
        name: "description",
        content: "Join TalentLink as a student, graduate, job seeker, mentor or employer.",
      },
      { property: "og:title", content: "Create your account – TalentLink" },
      {
        property: "og:description",
        content: "Join TalentLink as a student, graduate, job seeker, mentor or employer.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: RegisterPage,
});

const headlines: Record<Role, string> = {
  Student: "Student looking for an attachment or internship",
  Graduate: "Recent graduate ready for a first role",
  "Job Seeker": "Open to new opportunities",
  Mentor: "Professional offering mentorship",
  Employer: "Hiring local talent",
};

type Errors = { name?: string; email?: string; password?: string };

function RegisterPage() {
  const { signIn } = useSession();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("Student");
  const [location, setLocation] = useState("Nairobi");
  const [errors, setErrors] = useState<Errors>({});

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (name.trim().length < 2) next.name = "Enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) next.email = "Enter a valid email address.";
    if (password.length < 6) next.password = "Use at least 6 characters.";
    setErrors(next);
    if (next.name || next.email || next.password) return;
    signIn({
      name: name.trim(),
      email: email.trim(),
      role,
      headline: headlines[role],
      location,
      about: "",
      skills: [],
      experience: [],
    });
    toast.success("Welcome to TalentLink! Complete your profile to stand out.");
    void navigate({ to: "/profile" });
  };

  return (
    <AuthShell title="Create your account" subtitle="It takes less than a minute to get started.">
      <form onSubmit={onSubmit} noValidate className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            autoComplete="name"
            placeholder="e.g. Achieng Wanjiku"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-11"
          />
          <FieldError message={errors.name} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.co.ke"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11"
          />
          <FieldError message={errors.email} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11"
          />
          <FieldError message={errors.password} />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="role">I am a</Label>
            <Select value={role} onValueChange={(v) => setRole(v as Role)}>
              <SelectTrigger id="role" className="h-11 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ROLES.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Based in</Label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger id="location" className="h-11 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LOCATIONS.map((l) => (
                  <SelectItem key={l} value={l}>
                    {l}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button type="submit" variant="teal" size="lg" className="w-full">
          Create account
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-teal-strong hover:underline">
          Sign in
        </Link>
      </p>
      <DemoNote />
    </AuthShell>
  );
}
