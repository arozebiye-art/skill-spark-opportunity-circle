import type { Opportunity, Person } from "./data";

function matches(haystack: string[], q: string) {
  const needle = q.trim().toLowerCase();
  if (!needle) return true;
  return haystack.some((h) => h.toLowerCase().includes(needle));
}

export type OpportunityFilters = { q: string; type: string; location: string; mode: string };

export function filterOpportunities(list: Opportunity[], f: OpportunityFilters) {
  return list.filter(
    (o) =>
      (!f.type || o.type === f.type) &&
      (!f.location || o.location === f.location) &&
      (!f.mode || o.mode === f.mode) &&
      matches([o.title, o.company, o.field, o.summary, ...o.skills], f.q),
  );
}

export type PeopleFilters = { q: string; role: string; location: string };

export function filterPeople(list: Person[], f: PeopleFilters) {
  return list.filter(
    (p) =>
      (!f.role || p.role === f.role) &&
      (!f.location || p.location === f.location) &&
      matches([p.name, p.headline, p.field, ...p.skills], f.q),
  );
}

export type MentorFilters = { q: string; field: string };

export function filterMentors(list: Person[], f: MentorFilters) {
  return list.filter(
    (p) =>
      (!f.field || p.field === f.field) &&
      matches([p.name, p.headline, p.field, ...p.skills, ...(p.mentor?.topics ?? [])], f.q),
  );
}
