import { cn } from "@/lib/utils";

const tones = [
  "bg-primary text-primary-foreground",
  "bg-teal text-teal-foreground",
  "bg-accent text-accent-foreground",
  "bg-sand text-sand-foreground",
];

const sizes = {
  sm: "size-9 text-xs",
  md: "size-14 text-lg",
  lg: "size-24 text-3xl sm:size-28",
};

export function PersonAvatar({
  name,
  size = "md",
  className,
}: {
  name: string;
  size?: keyof typeof sizes;
  className?: string;
}) {
  const words = name.replace(/^Dr\.\s*/, "").split(/\s+/).filter(Boolean);
  const initials = words
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join("");
  let hash = 0;
  for (const ch of name) hash = (hash + ch.charCodeAt(0)) % tones.length;
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-display font-bold",
        tones[hash],
        sizes[size],
        className,
      )}
    >
      {initials || "?"}
    </span>
  );
}
