import { cn } from "@/lib/utils";

export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 64 64" className="size-8 shrink-0" aria-hidden="true">
        <rect
          width="64"
          height="64"
          rx="16"
          className={inverted ? "fill-primary-foreground/10" : "fill-primary"}
        />
        <circle cx="22" cy="24" r="7" className="fill-teal" />
        <circle cx="44" cy="40" r="7" className="fill-primary-foreground" />
        <path d="M27 28l12 8" className="stroke-teal" strokeWidth="5" strokeLinecap="round" />
      </svg>
      <span
        className={cn(
          "font-display text-xl font-extrabold tracking-tight",
          inverted ? "text-primary-foreground" : "text-primary",
        )}
      >
        Talent<span className={inverted ? "text-teal" : "text-teal-strong"}>Link</span>
      </span>
    </span>
  );
}
