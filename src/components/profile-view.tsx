import { Briefcase, GraduationCap, MapPin } from "lucide-react";
import type { ReactNode } from "react";

import { PersonAvatar } from "@/components/person-avatar";
import { Badge } from "@/components/ui/badge";
import type { Education, Experience } from "@/lib/data";

export type ProfileData = {
  name: string;
  role: string;
  headline: string;
  location: string;
  about: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
};

function Section({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-primary">{title}</h2>
        {action}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function ProfileView({
  profile: p,
  actions,
  experienceAction,
  aside,
}: {
  profile: ProfileData;
  actions?: ReactNode;
  experienceAction?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <div>
      <div className="bg-navy-gradient">
        <div className="container-page h-28 sm:h-36" />
      </div>
      <div className="container-page pb-16">
        <div className="-mt-12 rounded-2xl border border-border bg-card p-6 shadow-lift sm:-mt-14 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center">
              <PersonAvatar name={p.name} size="lg" className="ring-4 ring-card" />
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-widest text-teal-strong">
                  {p.role}
                </p>
                <h1 className="mt-1 text-3xl font-extrabold text-primary">{p.name}</h1>
                <p className="mt-1 text-foreground/80">{p.headline}</p>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="size-4 shrink-0" />
                  {p.location}, Kenya
                </p>
              </div>
            </div>
            {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="space-y-6">
            <Section title="About">
              <p className="leading-relaxed text-foreground/80">
                {p.about || "No introduction added yet."}
              </p>
            </Section>
            <Section title="Experience" action={experienceAction}>
              {p.experience.length === 0 ? (
                <p className="text-muted-foreground">No experience added yet.</p>
              ) : (
                <ol className="space-y-5">
                  {p.experience.map((e) => (
                    <li key={`${e.title}-${e.org}`} className="flex gap-4">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                        <Briefcase className="size-5" />
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-bold text-primary">{e.title}</h3>
                        <p className="text-sm text-foreground/80">{e.org}</p>
                        <p className="text-sm text-muted-foreground">{e.period}</p>
                        {e.summary ? (
                          <p className="mt-1.5 text-sm text-foreground/80">{e.summary}</p>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ol>
              )}
            </Section>
            {p.education.length > 0 ? (
              <Section title="Education">
                <ol className="space-y-5">
                  {p.education.map((e) => (
                    <li key={`${e.school}-${e.qualification}`} className="flex gap-4">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                        <GraduationCap className="size-5" />
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-bold text-primary">{e.qualification}</h3>
                        <p className="text-sm text-foreground/80">{e.school}</p>
                        <p className="text-sm text-muted-foreground">{e.period}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Section>
            ) : null}
          </div>
          <div className="space-y-6">
            <Section title="Skills">
              {p.skills.length === 0 ? (
                <p className="text-muted-foreground">No skills added yet.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {p.skills.map((s) => (
                    <Badge key={s} variant="secondary" className="px-3 py-1 text-sm font-medium">
                      {s}
                    </Badge>
                  ))}
                </div>
              )}
            </Section>
            {aside}
          </div>
        </div>
      </div>
    </div>
  );
}
