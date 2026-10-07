import { cn } from "@/lib/utils";

interface ChoiceGroupProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  error?: string;
}

export function ChoiceGroup({
  label,
  name,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  error,
}: ChoiceGroupProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-xs font-mono font-medium uppercase tracking-wider text-text/80">
        {label}
      </label>
      <div className="relative">
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={cn(
          "w-full cursor-pointer pl-4 pr-11 py-3.5 rounded-xl border bg-surface-2",
          value ? "text-text font-medium" : "text-text-muted/70",
          "hover:border-white/30 focus:border-ember focus:outline-none focus:ring-2 focus:ring-ember/25",
          "transition-colors duration-200 appearance-none text-base md:text-[15px]",
          error ? "border-red-400 focus:border-red-400" : "border-line-strong"
        )}
      >
        <option value="" className="bg-surface-2 text-text-muted">
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-surface-2 text-text">
            {option.label}
          </option>
        ))}
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 7.5l5 5 5-5" />
      </svg>
      </div>
      {error && <p className="text-sm font-medium text-red-400">{error}</p>}
    </div>
  );
}