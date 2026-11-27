import { Bookmark, Building2, CalendarClock, Check, MapPin, Wallet } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRequireSignIn, useSession } from "@/hooks/use-session";
import type { Opportunity, OpportunityType } from "@/lib/data";
import { cn } from "@/lib/utils";

const typeTone: Record<OpportunityType, string> = {
  Job: "bg-primary text-primary-foreground",
  Internship: "bg-accent text-accent-foreground",
  Attachment: "bg-sand text-sand-foreground",
};

export function TypeBadge({ type }: { type: OpportunityType }) {
  return (
    <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", typeTone[type])}>
      {type}
    </span>
  );
}

export function OpportunityCard({ opportunity: o }: { opportunity: Opportunity }) {
  const [open, setOpen] = useState(false);
  const { applied, apply, saved, toggleSaved } = useSession();
  const requireSignIn = useRequireSignIn();
  const hasApplied = applied.includes(o.id);
  const isSaved = saved.includes(o.id);

  const onApply = () => {
    if (!requireSignIn("apply")) return;
    apply(o.id);
    toast.success(`Application sent to ${o.company}`);
  };

  const onSave = () => {
    if (!requireSignIn("save opportunities")) return;
    toggleSaved(o.id);
    toast(isSaved ? "Removed from saved" : "Saved to your profile");
  };

  return (
    <>
      <article className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-teal/60 hover:shadow-lift">
        <div className="flex items-start justify-between gap-3">
          <TypeBadge type={o.type} />
          <button
            type="button"
            onClick={onSave}
            aria-label={isSaved ? `Remove ${o.title} from saved` : `Save ${o.title}`}
            aria-pressed={isSaved}
            className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Bookmark className={cn("size-5", isSaved && "fill-teal text-teal-strong")} />
          </button>
        </div>
        <h3 className="mt-4 text-lg font-bold leading-snug text-primary">{o.title}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-foreground/80">
          <Building2 className="size-4 shrink-0 text-teal-strong" />
          {o.company}
        </p>
        <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{o.summary}</p>
        <dl className="mt-4 space-y-1.5 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <MapPin className="size-4 shrink-0" />
            <dd>
              {o.location} · {o.mode}
            </dd>
          </div>
          <div className="flex items-center gap-1.5">
            <Wallet className="size-4 shrink-0" />
            <dd>{o.pay}</dd>
          </div>
        </dl>
        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          <span className="text-xs text-muted-foreground">Posted {o.posted.toLowerCase()}</span>
          <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
            View details
          </Button>
        </div>
      </article>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
          <DialogHeader>
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <TypeBadge type={o.type} />
              <Badge variant="outline">{o.field}</Badge>
            </div>
            <DialogTitle className="text-2xl text-primary">{o.title}</DialogTitle>
            <DialogDescription>
              {o.company} · {o.location} · {o.mode}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-5 text-sm">
            <p className="text-foreground/80">{o.summary}</p>
            <div className="grid gap-3 rounded-xl bg-secondary p-4 sm:grid-cols-2">
              <p className="flex items-center gap-2">
                <Wallet className="size-4 shrink-0 text-teal-strong" />
                {o.pay}
              </p>
              <p className="flex items-center gap-2">
                <CalendarClock className="size-4 shrink-0 text-teal-strong" />
                Apply by {o.deadline}
              </p>
            </div>
            <div>
              <h4 className="font-bold text-primary">What you need</h4>
              <ul className="mt-2 space-y-1.5 text-foreground/80">
                {o.requirements.map((r) => (
                  <li key={r} className="flex gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-teal-strong" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-2">
              {o.skills.map((s) => (
                <Badge key={s} variant="secondary">
                  {s}
                </Badge>
              ))}
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={onSave}>
              <Bookmark className={cn(isSaved && "fill-teal")} />
              {isSaved ? "Saved" : "Save"}
            </Button>
            <Button variant="teal" onClick={onApply} disabled={hasApplied}>
              {hasApplied ? (
                <>
                  <Check /> Applied
                </>
              ) : (
                "Apply now"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
