import { Eyebrow } from "@/components/ui/Eyebrow";
import { siteConfig } from "@/content/site";

export function ContactIntro() {
  return (
    <div className="flex flex-col justify-center h-full">
      <Eyebrow>Contact</Eyebrow>
      <h2 id="contact-heading" className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-text mt-2 leading-tight">
        Let's build <br />
        something great <br />
        together.
      </h2>
      <p className="mt-4 text-text-muted text-sm max-w-sm leading-relaxed">
        Tell us about your project, and we'll get back to you within 24 hours.
      </p>

      {/* Contact Info */}
      <div className="mt-8 space-y-4">
        <div className="flex items-start gap-4 group">
          <div className="w-10 h-10 rounded-full bg-ember/10 flex items-center justify-center text-ember text-sm flex-shrink-0 mt-0.5 group-hover:bg-ember/20 transition-colors">
            ✉
          </div>
          <div>
            <p className="text-[10px] text-text-faint font-mono uppercase tracking-wider">Email</p>
            <a href={`mailto:${siteConfig.email}`} className="text-text hover:text-ember transition-colors text-sm">
              {siteConfig.email}
            </a>
          </div>
        </div>
        <div className="flex items-start gap-4 group">
          <div className="w-10 h-10 rounded-full bg-ember/10 flex items-center justify-center text-ember text-sm flex-shrink-0 mt-0.5 group-hover:bg-ember/20 transition-colors">
            📍
          </div>
          <div>
            <p className="text-[10px] text-text-faint font-mono uppercase tracking-wider">Location</p>
            <span className="text-text text-sm">{siteConfig.location}</span>
          </div>
        </div>
        <div className="flex items-start gap-4 group">
          <div className="w-10 h-10 rounded-full bg-ember/10 flex items-center justify-center text-ember text-sm flex-shrink-0 mt-0.5 group-hover:bg-ember/20 transition-colors">
            🕐
          </div>
          <div>
            <p className="text-[10px] text-text-faint font-mono uppercase tracking-wider">Response Time</p>
            <span className="text-text text-sm">Within 24 hours</span>
          </div>
        </div>
      </div>

      {/* Trust Badge */}
      <div className="mt-8 flex items-center gap-3 text-xs text-text-faint border-t border-line/30 pt-6">
        <span className="text-lg">🔒</span>
        <span>Your information is safe with us.</span>
      </div>
    </div>
  );
}