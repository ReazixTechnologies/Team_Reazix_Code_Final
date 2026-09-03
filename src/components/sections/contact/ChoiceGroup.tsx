import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import type { ServiceAccent } from "@/types";

const ACCENT_BORDER_CLASS: Record<ServiceAccent, string> = {
  ember: "border-ember",
  amber: "border-amber",
  blush: "border-blush",
  violet: "border-violet",
  mint: "border-mint",
};

const ACCENT_TEXT_CLASS: Record<ServiceAccent, string> = {
  ember: "text-ember",
  amber: "text-amber",
  blush: "text-blush",
  violet: "text-violet",
  mint: "text-mint",
};

const ACCENT_BG_CLASS: Record<ServiceAccent, string> = {
  ember: "bg-ember",
  amber: "bg-amber",
  blush: "bg-blush",
  violet: "bg-violet",
  mint: "bg-mint",
};

export interface ChoiceGroupOption {
  value: string;
  label: string;
  /** Per-option accent (e.g. each service's own color). Defaults to ember when omitted. */
  accent?: ServiceAccent;
}

interface ChoiceGroupProps {
  legend: string;
  helper?: string;
  options: ChoiceGroupOption[];
  selected: string[];
  onSelect: (value: string) => void;
  multiple?: boolean;
  error?: string;
}

/** Chip picker: multi-select (services) or single-select (budget/timeline/project type) — same visual grammar either way. */
export const ChoiceGroup = forwardRef<HTMLFieldSetElement, ChoiceGroupProps>(function ChoiceGroup(
  { legend, helper, options, selected, onSelect, multiple = false, error },
  ref,
) {
  const errorId = error ? `${legend.replace(/\s+/g, "-").toLowerCase()}-error` : undefined;

  return (
    <fieldset ref={ref} tabIndex={-1} className="m-0 min-w-0 border-0 p-0 outline-none" aria-describedby={errorId}>
      <legend className="mb-4 block w-full p-0 text-left">
        <span className="block text-body text-text">{legend}</span>
        {helper ? <span className="mt-1 block text-sm text-text-muted">{helper}</span> : null}
      </legend>

      <div role={multiple ? "group" : "radiogroup"} aria-label={legend} className="flex flex-wrap gap-3">
        {options.map((option) => {
          const isSelected = selected.includes(option.value);
          const accent = option.accent ?? "ember";

          return (
            <button
              key={option.value}
              type="button"
              role={multiple ? undefined : "radio"}
              aria-pressed={multiple ? isSelected : undefined}
              aria-checked={multiple ? undefined : isSelected}
              data-cursor="hover"
              onClick={() => onSelect(option.value)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-label uppercase tracking-[0.22em] transition-colors duration-300",
                isSelected
                  ? [ACCENT_BORDER_CLASS[accent], ACCENT_TEXT_CLASS[accent]]
                  : "border-line text-text-muted hover:border-line-strong hover:text-text",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "h-1.5 w-1.5 shrink-0 rounded-full transition-opacity duration-300",
                  ACCENT_BG_CLASS[accent],
                  isSelected ? "opacity-100" : "opacity-0",
                )}
              />
              {option.label}
            </button>
          );
        })}
      </div>

      {error ? (
        <p id={errorId} role="alert" className="mt-3 border-l-4 border-ember py-1 pl-3 text-sm text-ember">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
});
