import { Check } from "lucide-react";
import type { ReactNode } from "react";

import { Logo } from "@/components/logo";

const points = [
  "Jobs, internships and attachments from local employers",
  "Mentors who have walked the path before you",
  "A profile that shows your skills and experience",
];

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-hero">
      <div className="container-page grid gap-8 py-10 md:py-16 lg:grid-cols-2 lg:gap-12">
        <aside className="bg-navy-gradient hidden flex-col justify-between rounded-3xl p-10 text-primary-foreground shadow-lift lg:flex">
          <Logo inverted />
          <div>
            <h2 className="text-3xl font-extrabold leading-tight">
              Your next opportunity is closer than you think.
            </h2>
            <ul className="mt-8 space-y-4">
              {points.map((p) => (
                <li key={p} className="flex gap-3 text-primary-foreground/85">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-teal text-teal-foreground">
                    <Check className="size-3.5" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-sm text-primary-foreground/60">
            Supporting decent work, reduced inequalities and partnerships.
          </p>
        </aside>
        <div className="mx-auto w-full max-w-md self-center rounded-3xl border border-border bg-card p-7 shadow-card sm:p-10">
          <h1 className="text-3xl font-extrabold text-primary">{title}</h1>
          <p className="mt-2 text-muted-foreground">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function FieldError({ message }: { message: string | undefined }) {
  if (!message) return null;
  return (
    <p role="alert" className="text-sm text-destructive">
      {message}
    </p>
  );
}

export function DemoNote() {
  return (
    <p className="mt-6 rounded-xl bg-accent px-4 py-3 text-sm text-accent-foreground">
      Demo version: accounts are not saved yet, so you stay signed in only for this visit.
    </p>
  );
}
