import { describe, expect, it } from "vitest";

import { mentors, opportunities, people } from "@/lib/data";
import { filterMentors, filterOpportunities, filterPeople } from "@/lib/filters";

const none = { q: "", type: "", location: "", mode: "" };

describe("opportunity search and filters", () => {
  it("shows everything when no filter is set", () => {
    expect(filterOpportunities(opportunities, none)).toHaveLength(opportunities.length);
  });

  it("filters by type", () => {
    const result = filterOpportunities(opportunities, { ...none, type: "Attachment" });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((o) => o.type === "Attachment")).toBe(true);
  });

  it("combines search text with location, ignoring case", () => {
    const result = filterOpportunities(opportunities, { ...none, q: "KOTLIN", location: "Nairobi" });
    expect(result.map((o) => o.id)).toEqual(["mobile-developer-fintech"]);
  });

  it("returns nothing when no opportunity matches", () => {
    expect(filterOpportunities(opportunities, { ...none, q: "astronaut" })).toEqual([]);
  });
});

describe("people and mentor filters", () => {
  it("filters people by role and location", () => {
    const result = filterPeople(people, { q: "", role: "Student", location: "Kisumu" });
    expect(result.map((p) => p.id)).toEqual(["faith-achieng"]);
  });

  it("finds mentors by the topics they offer", () => {
    const result = filterMentors(mentors, { q: "freelance", field: "" });
    expect(result.map((p) => p.id)).toEqual(["njeri-mwangi"]);
  });
});
