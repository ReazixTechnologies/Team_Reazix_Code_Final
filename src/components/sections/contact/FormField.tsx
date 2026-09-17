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
}: FormFieldProps) {
  const baseClasses = cn(
    "w-full px-4 py-3.5 rounded-xl border bg-void/40 text-text placeholder:text-text-faint/30",
    "focus:border-ember/50 focus:outline-none focus:ring-2 focus:ring-ember/10",
    "transition-all duration-300 text-sm",
    error ? "border-red-500 focus:border-red-500" : "border-line/30"
  );

  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="block text-[10px] font-mono uppercase tracking-wider text-text-faint">
        {label} {required && <span className="text-ember">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
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
          className={baseClasses}
        />
      )}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}