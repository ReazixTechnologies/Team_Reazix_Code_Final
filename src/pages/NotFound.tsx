import { Link } from "react-router-dom";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function NotFound() {
  return (
    <Container className="flex min-h-screen flex-col items-center justify-center gap-6 text-center">
      <Eyebrow>404</Eyebrow>
      <h1 className="text-h1 text-text">Page not found</h1>
      <p className="max-w-md text-body text-text-muted">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link
        to="/"
        data-cursor="hover"
        className="text-label font-mono uppercase tracking-[0.22em] text-ember underline underline-offset-4"
      >
        Back home
      </Link>
    </Container>
  );
}
