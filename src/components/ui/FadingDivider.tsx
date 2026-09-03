import { Container } from "./Container";

/** A Container-width hairline that fades to transparent at both ends — the seam between sub-sections. */
export function FadingDivider() {
  return (
    <Container>
      <div
        aria-hidden="true"
        className="h-px w-full"
        style={{ background: "linear-gradient(to right, transparent, var(--color-line), transparent)" }}
      />
    </Container>
  );
}
