import { useEffect, useState } from "react";

export function ThankYouAnimation() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
      <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/30 rounded-2xl p-8 md:p-12 max-w-md w-full mx-4 text-center animate-scale-up">
        
        {/* Checkmark Circle */}
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-green-500/30 animate-ping" />
          <div className="absolute inset-0 rounded-full border-4 border-green-500 animate-spin-slow" />
          <div className="absolute inset-0 rounded-full bg-green-500/20 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-green-400 animate-bounce-in"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Success Text */}
        <h2 className="font-display text-2xl md:text-3xl font-light text-white">
          Thank You!
        </h2>
        <p className="text-green-400 text-sm mt-1">Your message was sent successfully</p>

        {/* Progress Bar - PhonePe Style */}
        <div className="mt-6 w-full h-1 bg-green-500/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Details */}
        <p className="text-text-faint text-xs mt-4">
          We'll get back to you within 24 hours
        </p>

        {/* Animated dots */}
        <div className="flex justify-center gap-1 mt-3">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" style={{ animationDelay: "0s" }} />
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" style={{ animationDelay: "0.3s" }} />
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" style={{ animationDelay: "0.6s" }} />
        </div>
      </div>
    </div>
  );
}