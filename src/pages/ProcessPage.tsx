import { Seo } from "@/components/seo/Seo";
import { Process } from "@/components/sections/process/Process";

/** /process — the "How We Work" section, standing on its own after moving off the homepage. */
export function ProcessPage() {
  return (
    <>
      <Seo path="/process" />

      <Process />
    </>
  );
}
