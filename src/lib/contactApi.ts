// The single place the contact form's submission endpoint lives. This project ships
// with no backend, so wire one of these up before launch:
//
//   1. Formspree (or a similar form-relay service) — create a form, set
//      VITE_CONTACT_ENDPOINT to the form's POST URL. Zero backend code needed.
//   2. Resend via a serverless function — deploy a small function (Vercel/Netlify/
//      Cloudflare) that calls the Resend API, then point VITE_CONTACT_ENDPOINT at it.
//   3. A custom API route on your own backend that accepts this JSON shape and
//      sends/stores it however you like.
//
// Do not hardcode a real endpoint here — it belongs in the environment, not the repo.

export interface ContactPayload {
  services: string[];
  projectType: string;
  budget: string;
  timeline: string;
  name: string;
  email: string;
  company: string;
  message: string;
  referral: string;
}

const SIMULATED_DELAY_MS = 900;

function simulateSubmit(payload: ContactPayload): Promise<void> {
  return new Promise((resolve) => {
     
    console.info("[contactApi] VITE_CONTACT_ENDPOINT is not set — logging payload instead of sending it:", payload);
    window.setTimeout(resolve, SIMULATED_DELAY_MS);
  });
}

/** Submits the contact form. Logs and resolves locally when no endpoint is configured, so the UI stays fully testable. */
export async function submitContact(payload: ContactPayload): Promise<void> {
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;

  if (!endpoint) {
    await simulateSubmit(payload);
    return;
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Contact submission failed with status ${response.status}`);
  }
}
