import { createFileRoute } from "@tanstack/react-router";

import { FilterSelect } from "@/components/filter-select";
import { EmptyState, FilterBar, PageHero, SearchInput } from "@/components/page-parts";
import { PersonCard } from "@/components/person-card";
import { LOCATIONS, ROLES, people } from "@/lib/data";
import { pickStrings } from "@/lib/search";
import { filterPeople } from "@/lib/filters";

const defaults = { q: "", role: "", location: "" };

export const Route = createFileRoute("/network")({
  validateSearch: (search: Record<string, unknown>) => pickStrings(search, ["q", "role", "location"] as const),
  head: () => ({
    meta: [
      { title: "Network with students, graduates and employers – TalentLink" },
      {
        name: "description",
        content:
          "Discover and connect with students, graduates, job seekers, mentors and employers across Kenya.",
      },
      { property: "og:title", content: "Network with students, graduates and employers – TalentLink" },
      {
        property: "og:description",
        content:
          "Discover and connect with students, graduates, job seekers, mentors and employers across Kenya.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: NetworkPage,
});

function NetworkPage() {
  const filters = { ...defaults, ...Route.useSearch() };
  const navigate = Route.useNavigate();
  const results = filterPeople(people, filters);

  const set = (patch: Partial<typeof defaults>) =>
    void navigate({ to: ".", search: (prev) => ({ ...prev, ...patch }), replace: true });

  return (
    <>
      <PageHero
        eyebrow="Network"
        title="Meet the people behind the opportunities"
        description="Discover students, graduates, professionals and employers near you — and connect in one tap."
      />
      <div className="container-page py-10">
        <FilterBar>
          <SearchInput
            value={filters.q}
            onChange={(q) => set({ q })}
            placeholder="Search by name, skill or field"
          />
          <FilterSelect
            label="Role"
            allLabel="Everyone"
            value={filters.role}
            options={ROLES}
            onChange={(role) => set({ role })}
          />
          <FilterSelect
            label="Location"
            allLabel="All locations"
            value={filters.location}
            options={LOCATIONS}
            onChange={(location) => set({ location })}
          />
        </FilterBar>

        <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
          {results.length} {results.length === 1 ? "person" : "people"} found
        </p>

        {results.length === 0 ? (
          <div className="mt-4">
            <EmptyState onClear={() => set(defaults)} />
          </div>
        ) : (
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((p) => (
              <PersonCard key={p.id} person={p} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
