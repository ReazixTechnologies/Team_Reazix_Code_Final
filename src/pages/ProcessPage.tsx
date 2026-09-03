import { Helmet } from "react-helmet-async";
import { Process } from "@/components/sections/process/Process";
import { PROCESS_INTRO_DESCRIPTION } from "@/content/process";
import { siteConfig } from "@/content/site";

const PROCESS_PAGE_TITLE = "Process";

/** /process — the "How We Work" section, standing on its own after moving off the homepage. */
export function ProcessPage() {
  return (
    <>
      <Helmet>
        <title>{`${PROCESS_PAGE_TITLE} — ${siteConfig.name}`}</title>
        <meta name="description" content={PROCESS_INTRO_DESCRIPTION} />
      </Helmet>

      <Process />
    </>
  );
}
