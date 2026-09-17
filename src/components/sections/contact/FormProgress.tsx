import { cn } from "@/lib/utils";

interface FormProgressProps {
  steps: string[];
  currentStep: number;
}

export function FormProgress({ steps, currentStep }: FormProgressProps) {
  return (
    <div className="flex items-center gap-3">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center gap-2">
          <div
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              index <= currentStep ? "bg-ember" : "bg-line/30"
            )}
          />
          <span
            className={cn(
              "text-[9px] font-mono uppercase tracking-wider transition-colors duration-300 hidden sm:block",
              index <= currentStep ? "text-text" : "text-text-faint"
            )}
          >
            {step}
          </span>
        </div>
      ))}
    </div>
  );
}