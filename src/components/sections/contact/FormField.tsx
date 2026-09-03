import { motion } from "motion/react";
import { forwardRef, useLayoutEffect, useRef, useState, type ChangeEvent } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  id: string;
  label: string;
  type?: "text" | "email" | "textarea";
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  hint?: string;
  placeholder?: string;
  autoComplete?: string;
}

type FieldElement = HTMLInputElement | HTMLTextAreaElement;

/** Bottom-border text field / textarea with a floating label — no boxed inputs, no placeholder-as-label. */
export const FormField = forwardRef<FieldElement, FormFieldProps>(function FormField(
  { id, label, type = "text", value, onChange, error, required, hint, placeholder, autoComplete },
  forwardedRef,
) {
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const reducedMotion = useReducedMotion();
  const errorId = `${id}-error`;
  const isTextarea = type === "textarea";

  // A textarea with a native placeholder keeps the label parked up top rather than
  // overlapping the placeholder text at rest.
  const alwaysFloated = Boolean(placeholder);
  const floated = alwaysFloated || isFocused || value.length > 0;

  useLayoutEffect(() => {
    if (!isTextarea || !textareaRef.current) return;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, [isTextarea, value]);

  function setRefs(node: FieldElement | null) {
    if (isTextarea) textareaRef.current = node as HTMLTextAreaElement | null;
    if (typeof forwardedRef === "function") forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  }

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    onChange(event.target.value);
  }

  const sharedFieldProps = {
    id,
    name: id,
    value,
    onChange: handleChange,
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? errorId : undefined,
    autoComplete,
    placeholder,
    className: cn("peer w-full border-0 bg-transparent pb-3 pt-6 text-body text-text outline-none", isTextarea && "resize-none"),
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <label
          htmlFor={id}
          className={cn(
            "pointer-events-none absolute left-0 font-body text-text-faint transition-[transform,font-size,color] duration-300 ease-out-expo",
            floated
              ? "top-1 origin-left translate-y-0 font-mono text-label uppercase tracking-[0.22em]"
              : "top-1/2 -translate-y-1/2 text-body",
          )}
        >
          {label}
          {required ? (
            <span aria-hidden="true"> *</span>
          ) : hint ? (
            <span className="ml-1 normal-case tracking-normal text-text-faint">({hint})</span>
          ) : null}
        </label>

        {isTextarea ? (
          <textarea ref={setRefs} rows={1} {...sharedFieldProps} />
        ) : (
          <input ref={setRefs} type={type} {...sharedFieldProps} />
        )}

        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-line" />
        <motion.span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-ember"
          initial={false}
          animate={{ scaleX: isFocused ? 1 : 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.3, ease: EASE }}
          style={isFocused ? { boxShadow: "0 0 8px rgba(255, 107, 53, 0.5)" } : undefined}
        />
      </div>

      {error ? (
        <p id={errorId} role="alert" className="border-l-4 border-ember py-1 pl-3 text-sm text-ember">
          {error}
        </p>
      ) : null}
    </div>
  );
});
