import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { AuthShell, DemoNote, FieldError } from "@/components/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "@/hooks/use-session";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in – TalentLink" },
      { name: "description", content: "Sign in to TalentLink to apply, connect and find a mentor." },
      { property: "og:title", content: "Sign in – TalentLink" },
      { property: "og:description", content: "Sign in to TalentLink to apply, connect and find a mentor." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LoginPage,
});

function nameFromEmail(email: string) {
  const local = email.split("@")[0] ?? "";
  const words = local.split(/[._-]+/).filter(Boolean);
  return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") || "TalentLink Member";
}

function LoginPage() {
  const { signIn } = useSession();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: { email?: string; password?: string } = {};
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) next.email = "Enter a valid email address.";
    if (password.length < 6) next.password = "Your password has at least 6 characters.";
    setErrors(next);
    if (next.email || next.password) return;
    const name = nameFromEmail(email.trim());
    signIn({
      name,
      email: email.trim(),
      role: "Job Seeker",
      headline: "Open to new opportunities",
      location: "Nairobi",
      about: "",
      skills: [],
      experience: [],
    });
    toast.success(`Welcome back, ${name.split(" ")[0] ?? name}`);
    void navigate({ to: "/profile" });
  };

  return (
    <AuthShell title="Welcome back" subtitle="Sign in to continue where you left off.">
      <form onSubmit={onSubmit} noValidate className="space-y-5">
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
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11"
          />
          <FieldError message={errors.password} />
        </div>
        <Button type="submit" variant="teal" size="lg" className="w-full">
          Sign in
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        New to TalentLink?{" "}
        <Link to="/register" className="font-semibold text-teal-strong hover:underline">
          Create an account
        </Link>
      </p>
      <DemoNote />
    </AuthShell>
  );
}
