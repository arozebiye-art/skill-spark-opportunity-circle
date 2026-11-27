import { createFileRoute, Link, stripSearchParams } from "@tanstack/react-router";
import { fallback, zodValidator } from "@tanstack/zod-adapter";
import { CalendarCheck, MapPin, Medal } from "lucide-react";
import { z } from "zod";

import mentorshipImg from "@/assets/mentorship-illustration.webp";
import { FilterSelect } from "@/components/filter-select";
import { MentorRequestButton } from "@/components/mentor-request";
import { EmptyState, FilterBar, PageHero, SearchInput } from "@/components/page-parts";
import { PersonAvatar } from "@/components/person-avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FIELDS, mentors } from "@/lib/data";
import { filterMentors } from "@/lib/filters";

const defaults = { q: "", field: "" };

const searchSchema = z.object({
  q: fallback(z.string(), "").default(""),
  field: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/mentorship")({
  validateSearch: zodValidator(searchSchema),
  search: { middlewares: [stripSearchParams(defaults)] },
  head: () => ({
    meta: [
      { title: "Find a mentor – TalentLink" },
      {
        name: "description",
        content:
          "Connect with experienced Kenyan professionals for career advice, CV reviews and mock interviews.",
      },
      { property: "og:title", content: "Find a mentor – TalentLink" },
      {
        property: "og:description",
        content:
          "Connect with experienced Kenyan professionals for career advice, CV reviews and mock interviews.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: MentorshipPage,
});

function MentorshipPage() {
  const filters = Route.useSearch();
  const navigate = Route.useNavigate();
  const results = filterMentors(mentors, filters);
  const mentorFields = FIELDS.filter((f) => mentors.some((m) => m.field === f));

  const set = (patch: Partial<typeof defaults>) =>
    void navigate({ to: ".", search: (prev) => ({ ...prev, ...patch }), replace: true });

  return (
    <>
      <PageHero
        eyebrow="Mentorship"
        title="Learn from people who've done it"
        description="Experienced professionals volunteer their time to guide students and graduates. Pick a mentor and send a request."
      >
        <img
          src={mentorshipImg}
          alt="A mentor and a graduate talking at a table"
          width={1200}
          height={800}
          className="hidden w-80 rounded-3xl border border-border shadow-lift lg:block xl:w-96"
        />
      </PageHero>
      <div className="container-page py-10">
        <FilterBar>
          <SearchInput
            value={filters.q}
            onChange={(q) => set({ q })}
            placeholder="Search by name, topic or skill"
          />
          <FilterSelect
            label="Field"
            allLabel="All fields"
            value={filters.field}
            options={mentorFields}
            onChange={(field) => set({ field })}
          />
        </FilterBar>

        <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
          {results.length} {results.length === 1 ? "mentor" : "mentors"} available
        </p>

        {results.length === 0 ? (
          <div className="mt-4">
            <EmptyState onClear={() => set(defaults)} />
          </div>
        ) : (
          <div className="mt-4 grid gap-6 lg:grid-cols-2">
            {results.map((m) => (
              <article
                key={m.id}
                className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:border-teal/60 hover:shadow-lift sm:p-7"
              >
                <div className="flex items-start gap-4">
                  <PersonAvatar name={m.name} />
                  <div className="min-w-0">
                    <h2 className="text-lg font-bold text-primary">{m.name}</h2>
                    <p className="text-sm text-foreground/80">{m.headline}</p>
                  </div>
                </div>
                <dl className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="size-4 shrink-0 text-teal-strong" />
                    <dd>{m.location}</dd>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Medal className="size-4 shrink-0 text-teal-strong" />
                    <dd>{m.mentor?.years} years' experience</dd>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CalendarCheck className="size-4 shrink-0 text-teal-strong" />
                    <dd>{m.mentor?.availability}</dd>
                  </div>
                </dl>
                <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Can help with
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {m.mentor?.topics.map((t) => (
                    <Badge key={t} className="bg-accent font-medium text-accent-foreground hover:bg-accent">
                      {t}
                    </Badge>
                  ))}
                </div>
                <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
                  <MentorRequestButton mentor={m} />
                  <Button asChild size="sm" variant="ghost">
                    <Link to="/people/$id" params={{ id: m.id }}>
                      View profile
                    </Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
