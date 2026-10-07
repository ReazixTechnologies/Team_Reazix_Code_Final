import { cn } from "@/lib/utils";

interface SubmitButtonProps {
  status: "idle" | "sending" | "success" | "error";
}

export function SubmitButton({ status }: SubmitButtonProps) {
  const isSending = status === "sending";
  const isSuccess = status === "success";

  return (
    <button
      type="submit"
      disabled={isSending || isSuccess}
      className={cn(
        "w-full py-4 rounded-xl font-mono text-sm font-semibold uppercase tracking-wider",
        "transition-all duration-300 flex items-center justify-center gap-3",
        "relative overflow-hidden group",
        isSuccess
          ? "bg-green-500 text-white"
          : "bg-ember text-void hover:bg-ember/80 hover:shadow-lg hover:shadow-ember/20",
        isSending && "opacity-70 cursor-wait",
        isSuccess && "cursor-default"
      )}
    >
      {isSending ? (
        <>
          <span
            aria-hidden="true"
            className="h-4 w-4 animate-spin rounded-full border-2 border-void/30 border-t-void"
          />
          Sending...
        </>
      ) : isSuccess ? (
        "✓ Message Sent!"
      ) : (
        <>
          <span>Send Message</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </>
      )}
    </button>
  );
}