import { Magnetic } from "@/components/motion/Magnetic";
import { Marquee } from "@/components/motion/Marquee";
import { buttonClasses } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LogoMark } from "@/components/ui/LogoMark";
import { CLIENTS } from "@/content/clients";
import { TRUST_STRIP_CLOSING_LINE, TRUST_STRIP_CTA_LABEL, TRUST_STRIP_EYEBROW } from "@/content/manifesto";
import { useSmoothScrollLink } from "@/hooks/useSmoothScrollLink";

/** Closes the manifesto band: proof-by-association logo row + a soft CTA into work. */
export function TrustStrip() {
  const handleSmoothScroll = useSmoothScrollLink();

  return (
    <Container className="flex flex-col items-center gap-10 text-center">
      <Eyebrow>{TRUST_STRIP_EYEBROW}</Eyebrow>

      <Marquee speed={36} className="w-full">
        {CLIENTS.map((client) => (
          <div
            key={client.name}
            data-cursor="hover"
            className="opacity-35 grayscale transition-all duration-300 hover:scale-105 hover:opacity-100 hover:grayscale-0"
          >
            <LogoMark name={client.name} svg={client.svg} />
          </div>
        ))}
      </Marquee>

      <div className="flex flex-col items-center gap-6">
        <p className="max-w-xl text-body text-text-muted">{TRUST_STRIP_CLOSING_LINE}</p>
        <Magnetic strength={0.35}>
          <a
            href="#work"
            onClick={(event) => handleSmoothScroll(event, "#work")}
            data-cursor="hover"
            className={buttonClasses({ variant: "ghost", size: "lg" })}
          >
            {TRUST_STRIP_CTA_LABEL}
          </a>
        </Magnetic>
      </div>
    </Container>
  );
}
