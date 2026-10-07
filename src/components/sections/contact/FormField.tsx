import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  type?: "text" | "email" | "tel" | "textarea";
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  rows?: number;
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel" | "numeric";
}

export function FormField({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
  required,
  rows = 3,
  autoComplete,
  inputMode,
}: FormFieldProps) {
  const baseClasses = cn(
    "w-full px-4 py-3.5 rounded-xl border bg-surface-2 text-text font-medium placeholder:font-normal placeholder:text-text-muted/70",
    "hover:border-white/30 focus:border-ember focus:outline-none focus:ring-2 focus:ring-ember/25",
    "transition-colors duration-200 text-base md:text-[15px]",
    error ? "border-red-400 focus:border-red-400" : "border-line-strong"
  );

  const errorId = `${name}-error`;
  const a11y = {
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    "aria-required": required || undefined,
    autoComplete,
  };

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-xs font-mono font-medium uppercase tracking-wider text-text/80">
        {label} {required && <span className="text-ember" aria-hidden="true">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          {...a11y}
          className={cn(baseClasses, "resize-none min-h-[100px]")}
        />
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          inputMode={inputMode}
          {...a11y}
          className={baseClasses}
        />
      )}
      {error && (
        <p id={errorId} role="alert" className="text-sm font-medium text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}