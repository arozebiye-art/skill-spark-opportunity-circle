import { createFileRoute } from "@tanstack/react-router";

import { FilterSelect } from "@/components/filter-select";
import { OpportunityCard } from "@/components/opportunity-card";
import { EmptyState, FilterBar, PageHero, SearchInput } from "@/components/page-parts";
import { LOCATIONS, OPPORTUNITY_TYPES, WORK_MODES, opportunities } from "@/lib/data";
import { pickStrings } from "@/lib/search";
import { filterOpportunities } from "@/lib/filters";

const defaults = { q: "", type: "", location: "", mode: "" };

export const Route = createFileRoute("/opportunities")({
  validateSearch: (search: Record<string, unknown>) => pickStrings(search, ["q", "type", "location", "mode"] as const),
  head: () => ({
    meta: [
      { title: "Jobs, internships and attachments in Kenya – TalentLink" },
      {
        name: "description",
        content:
          "Search jobs, internships and industrial attachments from local employers across Kenya.",
      },
      { property: "og:title", content: "Jobs, internships and attachments in Kenya – TalentLink" },
      {
        property: "og:description",
        content:
          "Search jobs, internships and industrial attachments from local employers across Kenya.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: OpportunitiesPage,
});

function OpportunitiesPage() {
  const filters = { ...defaults, ...Route.useSearch() };
  const navigate = Route.useNavigate();
  const results = filterOpportunities(opportunities, filters);

  const set = (patch: Partial<typeof defaults>) =>
    void navigate({ to: ".", search: (prev) => ({ ...prev, ...patch }), replace: true });

  return (
    <>
      <PageHero
        eyebrow="Opportunities"
        title="Find work that fits where you are"
        description="Jobs, internships and attachments from employers across Kenya — updated every week."
      />
      <div className="container-page py-10">
        <FilterBar>
          <SearchInput
            value={filters.q}
            onChange={(q) => set({ q })}
            placeholder="Search by title, company or skill"
          />
          <FilterSelect
            label="Type"
            allLabel="All types"
            value={filters.type}
            options={OPPORTUNITY_TYPES}
            onChange={(type) => set({ type })}
          />
          <FilterSelect
            label="Location"
            allLabel="All locations"
            value={filters.location}
            options={LOCATIONS}
            onChange={(location) => set({ location })}
          />
          <FilterSelect
            label="Work mode"
            allLabel="Any work mode"
            value={filters.mode}
            options={WORK_MODES}
            onChange={(mode) => set({ mode })}
          />
        </FilterBar>

        <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
          {results.length} {results.length === 1 ? "opportunity" : "opportunities"} found
        </p>

        {results.length === 0 ? (
          <div className="mt-4">
            <EmptyState onClear={() => set(defaults)} />
          </div>
        ) : (
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((o) => (
              <OpportunityCard key={o.id} opportunity={o} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
