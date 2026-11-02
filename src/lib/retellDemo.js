// Shared setup for the /callagents live demo (Freya, Retell AI).
// Server-side only: the Retell key never reaches the browser.

export const RETELL_API = "https://api.retellai.com";
export const DEMO_AGENT_ID = process.env.RETELL_AGENT_ID || "agent_99b7b8c0593b742b4e0aac4bf2";

// First name only, letters/spaces/'-. only, so nothing odd gets read out or injected into the prompt.
export function cleanName(raw) {
  const name = String(raw || "")
    .normalize("NFKC")
    .replace(/[^\p{L}\p{M}' .-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 40);
  return name;
}

/**
 * Dynamic variables for the Freya agent. The flow reads customer_name and contact, and also has
 * lead fields with defaults from a real lead; we set neutral values so a website visitor never hears
 * another lead's project or details.
 */
export function demoVariables({ name, contact = "", callId }) {
  const today = new Date().toLocaleDateString("en-GB", { timeZone: "Asia/Dubai" }).replace(/\//g, "-");
  return {
    customer_name: name || "there",
    contact,
    contact_number: contact.replace(/^\+/, ""),
    lead_id: callId,
    project_name: "Generic",
    property_type: "",
    timeframe: "",
    city: "Dubai",
    nationality: "",
    first_contact_date: today,
    last_follow_up: "",
  };
}

export async function retell(path, body) {
  const r = await fetch(`${RETELL_API}${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RETELL_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(12_000),
  });
  const json = await r.json().catch(() => ({}));
  return { ok: r.ok, status: r.status, json };
}
