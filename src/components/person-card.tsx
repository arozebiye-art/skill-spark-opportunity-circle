import { Link } from "@tanstack/react-router";
import { Check, MapPin, UserPlus } from "lucide-react";
import { toast } from "sonner";

import { PersonAvatar } from "@/components/person-avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRequireSignIn, useSession } from "@/hooks/use-session";
import type { Person } from "@/lib/data";

export function ConnectButton({ person, size = "sm" }: { person: Person; size?: "sm" | "default" }) {
  const { connections, toggleConnection } = useSession();
  const requireSignIn = useRequireSignIn();
  const connected = connections.includes(person.id);
  return (
    <Button
      size={size}
      variant={connected ? "secondary" : "default"}
      aria-pressed={connected}
      onClick={() => {
        if (!requireSignIn("connect with people")) return;
        toggleConnection(person.id);
        toast(connected ? `Removed ${person.name}` : `You're now connected with ${person.name}`);
      }}
    >
      {connected ? <Check /> : <UserPlus />}
      {connected ? "Connected" : "Connect"}
    </Button>
  );
}

export function PersonCard({ person: p }: { person: Person }) {
  return (
    <article className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-teal/60 hover:shadow-lift">
      <div className="flex items-start gap-4">
        <PersonAvatar name={p.name} />
        <div className="min-w-0">
          <h3 className="truncate text-lg font-bold text-primary">{p.name}</h3>
          <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-teal-strong">
            {p.role}
          </p>
        </div>
      </div>
      <p className="mt-4 line-clamp-2 text-sm text-foreground/80">{p.headline}</p>
      <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
        <MapPin className="size-4 shrink-0" />
        {p.location} · {p.field}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {p.skills.slice(0, 3).map((s) => (
          <Badge key={s} variant="secondary" className="font-medium">
            {s}
          </Badge>
        ))}
      </div>
      <div className="mt-auto flex items-center gap-2 pt-6">
        <ConnectButton person={p} />
        <Button asChild size="sm" variant="ghost">
          <Link to="/people/$id" params={{ id: p.id }}>
            View profile
          </Link>
        </Button>
      </div>
    </article>
  );
}
