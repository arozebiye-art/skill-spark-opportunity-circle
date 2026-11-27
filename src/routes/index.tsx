import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Briefcase,
  Building2,
  GraduationCap,
  Handshake,
  Scale,
  Search,
  TrendingUp,
  UserRoundSearch,
  Users,
} from "lucide-react";
import { useState } from "react";

import heroImg from "@/assets/hero-illustration.webp";
import mentorshipImg from "@/assets/mentorship-illustration.webp";
import { OpportunityCard } from "@/components/opportunity-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { opportunities } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TalentLink – Connecting Local Talent to Opportunities" },
      {
        name: "description",
        content:
          "Find jobs, internships, attachments and mentors in Kenya. TalentLink brings students, graduates, job seekers, mentors and employers together.",
      },
      { property: "og:title", content: "TalentLink – Connecting Local Talent to Opportunities" },
      {
        property: "og:description",
        content:
          "Find jobs, internships, attachments and mentors in Kenya. TalentLink brings students, graduates, job seekers, mentors and employers together.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const audiences = [
  { icon: GraduationCap, title: "Students", text: "Find attachments and internships that count towards your course." },
  { icon: TrendingUp, title: "Graduates", text: "Land a first role with employers who train and grow new talent." },
  { icon: UserRoundSearch, title: "Job seekers", text: "Search openings near you and apply with one profile." },
  { icon: Handshake, title: "Mentors", text: "Share what you've learned with the next generation." },
  { icon: Building2, title: "Employers", text: "Reach motivated local talent in every county." },
];

const steps = [
  { title: "Create your profile", text: "Add your skills, education and experience in a few minutes." },
  { title: "Discover and connect", text: "Search opportunities, find a mentor and grow your network." },
  { title: "Take the next step", text: "Apply, request mentorship and keep track of it all in one place." },
];

const goals = [
  { icon: Briefcase, number: "8", title: "Decent Work", text: "Opening up fair, quality work for young people." },
  { icon: Scale, number: "10", title: "Reduced Inequalities", text: "Giving talent outside big cities equal access." },
  { icon: Users, number: "17", title: "Partnerships", text: "Linking schools, mentors and employers." },
];

function Index() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  return (
    <>
      <section className="bg-hero">
        <div className="container-page grid items-center gap-12 py-14 md:py-20 lg:grid-cols-2">
          <div>
            <p className="inline-flex rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-accent-foreground">
              Connecting Local Talent to Opportunities
            </p>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight text-primary sm:text-5xl lg:text-6xl">
              Where Kenyan talent meets its <span className="text-teal-strong">next opportunity</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              TalentLink brings students, graduates, job seekers, mentors and employers together on
              one platform — for jobs, internships, attachments and guidance.
            </p>
            <form
              className="mt-8 flex max-w-xl flex-col gap-2 rounded-2xl border border-border bg-card p-2 shadow-card sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                void navigate({ to: "/opportunities", search: q.trim() ? { q: q.trim() } : {} });
              }}
            >
              <div className="relative min-w-0 flex-1">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  aria-label="Search opportunities"
                  placeholder="Try “internship” or “Kisumu”"
                  className="h-11 border-0 pl-10 shadow-none focus-visible:ring-0"
                />
              </div>
              <Button type="submit" size="lg">
                Search
              </Button>
            </form>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="teal" size="lg">
                <Link to="/register">
                  Get Started <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/opportunities">Browse opportunities</Link>
              </Button>
            </div>
          </div>
          <img
            src={heroImg}
            alt="Students, graduates and professionals connecting in front of the Nairobi skyline"
            width={1200}
            height={800}
            fetchPriority="high"
            className="w-full rounded-3xl border border-border shadow-lift"
          />
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <h2 className="text-3xl font-extrabold text-primary md:text-4xl">One platform, five communities</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {audiences.map((a) => (
            <div key={a.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <span className="flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <a.icon className="size-5" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-primary">{a.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{a.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/60 py-16 md:py-20">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl font-extrabold text-primary md:text-4xl">Latest opportunities</h2>
            <Button asChild variant="ghost">
              <Link to="/opportunities">
                See all <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {opportunities.slice(0, 3).map((o) => (
              <OpportunityCard key={o.id} opportunity={o} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <h2 className="text-3xl font-extrabold text-primary md:text-4xl">How it works</h2>
        <ol className="mt-8 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-border bg-card p-7 shadow-card">
              <span className="font-display text-4xl font-extrabold text-teal-strong">0{i + 1}</span>
              <h3 className="mt-3 text-xl font-bold text-primary">{s.title}</h3>
              <p className="mt-2 text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container-page pb-16 md:pb-20">
        <div className="bg-navy-gradient grid items-center gap-8 overflow-hidden rounded-3xl p-8 text-primary-foreground shadow-lift md:p-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-teal">Mentorship</p>
            <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">Guidance from people who've been there</h2>
            <p className="mt-4 text-primary-foreground/75">
              Get CV reviews, mock interviews and honest career advice from experienced professionals.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild variant="teal" size="lg">
                <Link to="/mentorship">Find a mentor</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link to="/network">Explore the network</Link>
              </Button>
            </div>
          </div>
          <img
            src={mentorshipImg}
            alt="A mentor and a graduate talking at a table"
            width={1200}
            height={800}
            loading="lazy"
            className="w-full rounded-2xl"
          />
        </div>
      </section>

      <section className="bg-secondary/60 py-16 md:py-20">
        <div className="container-page">
          <h2 className="text-3xl font-extrabold text-primary md:text-4xl">Built for the Global Goals</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            TalentLink supports three UN Sustainable Development Goals.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {goals.map((g) => (
              <div key={g.number} className="rounded-2xl border border-border bg-card p-7 shadow-card">
                <div className="flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <g.icon className="size-5" />
                  </span>
                  <p className="text-sm font-semibold uppercase tracking-wider text-teal-strong">SDG {g.number}</p>
                </div>
                <h3 className="mt-4 text-xl font-bold text-primary">{g.title}</h3>
                <p className="mt-2 text-muted-foreground">{g.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16 text-center md:py-20">
        <h2 className="text-3xl font-extrabold text-primary md:text-4xl">Ready to take the next step?</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Create your free profile and start connecting today.
        </p>
        <Button asChild variant="teal" size="lg" className="mt-7">
          <Link to="/register">
            Get Started <ArrowRight />
          </Link>
        </Button>
      </section>
    </>
  );
}
