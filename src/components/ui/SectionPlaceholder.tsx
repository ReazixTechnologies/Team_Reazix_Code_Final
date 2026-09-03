import { cn } from "@/lib/utils";

interface SectionPlaceholderProps {
  name: string;
  index: number;
  className?: string;
}

/** Temporary full-height block standing in for a module not yet built. */
export function SectionPlaceholder({ name, index, className }: SectionPlaceholderProps) {
  return (
    <section
      className={cn(
        "flex min-h-screen items-center justify-center border-t border-line first:border-t-0",
        className,
      )}
    >
      <p className="font-mono text-label uppercase tracking-[0.22em] text-text-faint">
        {String(index).padStart(2, "0")} — {name}
      </p>
    </section>
  );
}
