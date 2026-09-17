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
    <div className="space-y-1.5">
      <label htmlFor={name} className="block text-[10px] font-mono uppercase tracking-wider text-text-faint">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={cn(
          "w-full px-4 py-3.5 rounded-xl border bg-void/40 text-text",
          "focus:border-ember/50 focus:outline-none focus:ring-2 focus:ring-ember/10",
          "transition-all duration-300 appearance-none text-sm",
          error ? "border-red-500 focus:border-red-500" : "border-line/30"
        )}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}