import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TEAM_DESCRIPTION, TEAM_EYEBROW, TEAM_HEADING, TEAM_MEMBERS } from "@/content/team";
import { STAGGER } from "@/lib/motion";

/** Placeholder roster card — swap for a real photo once one exists. */
function TeamCard({ initials, role, focus }: { initials: string; role: string; focus: string }) {
  return (
    <div className="flex flex-col gap-6 rounded-xl border border-line bg-surface p-8">
      <span className="flex h-16 w-16 items-center justify-center rounded-full border border-line-strong font-mono text-label text-text-muted">
        {initials}
      </span>
      <div className="flex flex-col gap-1">
        <h3 className="text-h3 font-display font-light text-text">{role}</h3>
        <p className="text-body text-text-muted">{focus}</p>
      </div>
    </div>
  );
}

export function Team() {
  return (
    <section id="team" aria-label="Team" className="relative border-t border-line bg-void">
      <Container className="flex flex-col gap-16 py-section">
        <SectionHeading eyebrow={TEAM_EYEBROW} title={TEAM_HEADING} description={TEAM_DESCRIPTION} />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM_MEMBERS.map((member, index) => (
            <Reveal key={member.role} delay={index * STAGGER.base}>
              <TeamCard initials={member.initials} role={member.role} focus={member.focus} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
