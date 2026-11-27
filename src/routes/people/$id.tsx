import { createFileRoute, Link, notFound, type ErrorComponentProps } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { MentorRequestButton } from "@/components/mentor-request";
import { ConnectButton } from "@/components/person-card";
import { ProfileView } from "@/components/profile-view";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getPerson } from "@/lib/data";

export const Route = createFileRoute("/people/$id")({
  loader: ({ params }) => {
    const person = getPerson(params.id);
    if (!person) throw notFound();
    return person;
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Profile – TalentLink" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.name} – ${loaderData.role} on TalentLink`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.headline },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.headline },
        { property: "og:type", content: "profile" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  component: PersonPage,
  notFoundComponent: PersonNotFound,
  errorComponent: PersonError,
});

function BackLink() {
  return (
    <Button asChild variant="outline">
      <Link to="/network">
        <ArrowLeft /> Back to network
      </Link>
    </Button>
  );
}

function PersonNotFound() {
  return (
    <div className="container-page py-24 text-center">
      <h1 className="text-3xl font-extrabold text-primary">Profile not found</h1>
      <p className="mt-3 text-muted-foreground">This person may have left TalentLink.</p>
      <div className="mt-6">
        <BackLink />
      </div>
    </div>
  );
}

function PersonError({ error }: ErrorComponentProps) {
  console.error(error);
  return (
    <div className="container-page py-24 text-center">
      <h1 className="text-3xl font-extrabold text-primary">This profile didn't load</h1>
      <div className="mt-6">
        <BackLink />
      </div>
    </div>
  );
}

function PersonPage() {
  const person = Route.useLoaderData();
  return (
    <ProfileView
      profile={person}
      actions={
        <>
          <ConnectButton person={person} size="default" />
          {person.mentor ? <MentorRequestButton mentor={person} /> : null}
        </>
      }
      aside={
        person.mentor ? (
          <section className="rounded-2xl border border-teal/40 bg-accent p-6 sm:p-8">
            <h2 className="text-xl font-bold text-primary">Mentorship</h2>
            <p className="mt-2 text-sm text-accent-foreground">
              {person.mentor.years} years' experience · {person.mentor.availability}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {person.mentor.topics.map((t) => (
                <Badge key={t} variant="outline" className="border-teal/50 bg-card font-medium">
                  {t}
                </Badge>
              ))}
            </div>
          </section>
        ) : null
      }
    />
  );
}
