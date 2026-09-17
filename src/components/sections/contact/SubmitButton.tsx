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
        "w-full py-4 rounded-xl font-mono text-sm uppercase tracking-wider",
        "transition-all duration-300 flex items-center justify-center gap-3",
        "relative overflow-hidden group",
        isSuccess
          ? "bg-green-500 text-white"
          : "bg-ember text-void hover:bg-ember/80 hover:shadow-lg hover:shadow-ember/20",
        (isSending || isSuccess) && "opacity-50 cursor-not-allowed"
      )}
    >
      {isSending ? (
        <>
          <span className="animate-spin">⏳</span> Sending...
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