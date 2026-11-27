import { createFileRoute, Link } from "@tanstack/react-router";
import { Pencil, Plus, UserRound } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { ProfileView } from "@/components/profile-view";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSession, type SessionUser } from "@/hooks/use-session";
import { getOpportunity, getPerson } from "@/lib/data";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "My profile – TalentLink" },
      { name: "description", content: "Show your skills and experience to employers and mentors." },
      { property: "og:title", content: "My profile – TalentLink" },
      { property: "og:description", content: "Show your skills and experience to employers and mentors." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user } = useSession();

  if (!user) {
    return (
      <div className="bg-hero">
        <div className="container-page py-24 text-center">
          <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
            <UserRound className="size-8" />
          </span>
          <h1 className="mt-6 text-3xl font-extrabold text-primary">Your profile lives here</h1>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            Sign in or create an account to showcase your skills and experience.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="teal" size="lg">
              <Link to="/register">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/login">Sign in</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return <SignedInProfile user={user} />;
}

function SignedInProfile({ user }: { user: SessionUser }) {
  const { applied, saved, connections, mentorRequests } = useSession();
  const [editing, setEditing] = useState(false);
  const [addingExperience, setAddingExperience] = useState(false);

  return (
    <>
      <ProfileView
        profile={{ ...user, education: [] }}
        actions={
          <Button onClick={() => setEditing(true)}>
            <Pencil /> Edit profile
          </Button>
        }
        experienceAction={
          <Button size="sm" variant="outline" onClick={() => setAddingExperience(true)}>
            <Plus /> Add
          </Button>
        }
        aside={
          <section className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
            <h2 className="text-xl font-bold text-primary">Your activity</h2>
            <ActivityList
              title="Applications"
              empty="You haven't applied to anything yet."
              items={applied.map((id) => {
                const o = getOpportunity(id);
                return o ? `${o.title} · ${o.company}` : id;
              })}
            />
            <ActivityList
              title="Saved"
              empty="Nothing saved yet."
              items={saved.map((id) => getOpportunity(id)?.title ?? id)}
            />
            <ActivityList
              title="Connections"
              empty="No connections yet."
              items={connections.map((id) => getPerson(id)?.name ?? id)}
            />
            <ActivityList
              title="Mentorship requests"
              empty="No requests sent yet."
              items={mentorRequests.map((id) => getPerson(id)?.name ?? id)}
            />
            <Button asChild variant="teal" className="mt-6 w-full">
              <Link to="/opportunities">Browse opportunities</Link>
            </Button>
          </section>
        }
      />
      {editing ? <EditProfileDialog user={user} onClose={() => setEditing(false)} /> : null}
      {addingExperience ? (
        <AddExperienceDialog user={user} onClose={() => setAddingExperience(false)} />
      ) : null}
    </>
  );
}

function ActivityList({ title, empty, items }: { title: string; empty: string; items: string[] }) {
  return (
    <div className="mt-5">
      <h3 className="text-sm font-semibold text-primary">
        {title} <span className="font-normal text-muted-foreground">({items.length})</span>
      </h3>
      {items.length === 0 ? (
        <p className="mt-1 text-sm text-muted-foreground">{empty}</p>
      ) : (
        <ul className="mt-1 space-y-1 text-sm text-foreground/80">
          {items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function EditProfileDialog({ user, onClose }: { user: SessionUser; onClose: () => void }) {
  const { updateUser } = useSession();
  const [name, setName] = useState(user.name);
  const [headline, setHeadline] = useState(user.headline);
  const [location, setLocation] = useState(user.location);
  const [about, setAbout] = useState(user.about);
  const [skills, setSkills] = useState(user.skills.join(", "));

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateUser({
              name: name.trim() || user.name,
              headline: headline.trim(),
              location: location.trim() || user.location,
              about: about.trim(),
              skills: skills
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
            });
            toast.success("Profile updated");
            onClose();
          }}
        >
          <DialogHeader>
            <DialogTitle className="text-primary">Edit profile</DialogTitle>
            <DialogDescription>Tell employers and mentors who you are.</DialogDescription>
          </DialogHeader>
          <div className="my-5 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="p-name">Full name</Label>
              <Input id="p-name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="p-headline">Headline</Label>
              <Input
                id="p-headline"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="e.g. Accounting graduate seeking a trainee role"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="p-location">Town or city</Label>
              <Input id="p-location" value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="p-about">About</Label>
              <Textarea
                id="p-about"
                rows={4}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="A few sentences about what you've done and what you're looking for."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="p-skills">Skills</Label>
              <Input
                id="p-skills"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="Excel, Customer service, Kiswahili"
              />
              <p className="text-xs text-muted-foreground">Separate skills with commas.</p>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="teal">
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function AddExperienceDialog({ user, onClose }: { user: SessionUser; onClose: () => void }) {
  const { updateUser } = useSession();
  const [title, setTitle] = useState("");
  const [org, setOrg] = useState("");
  const [period, setPeriod] = useState("");

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateUser({
              experience: [
                { title: title.trim(), org: org.trim(), period: period.trim() },
                ...user.experience,
              ],
            });
            toast.success("Experience added");
            onClose();
          }}
        >
          <DialogHeader>
            <DialogTitle className="text-primary">Add experience</DialogTitle>
            <DialogDescription>
              Jobs, internships, attachments and volunteering all count.
            </DialogDescription>
          </DialogHeader>
          <div className="my-5 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="x-title">Role</Label>
              <Input
                id="x-title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Accounts Intern"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="x-org">Organisation</Label>
              <Input
                id="x-org"
                required
                value={org}
                onChange={(e) => setOrg(e.target.value)}
                placeholder="e.g. Baraka Sacco"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="x-period">When</Label>
              <Input
                id="x-period"
                required
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                placeholder="e.g. Jan – Apr 2026"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="teal">
              Add experience
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
