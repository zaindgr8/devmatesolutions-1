// Shared setup for the /callagents live demo (Freya, Retell AI).
// Server-side only: the Retell key never reaches the browser.

export const RETELL_API = "https://api.retellai.com";

// The voice demos on /callagents. Browsers send one of these keys, never an agent ID.
export const DEMO_AGENTS = {
  "real-estate": { label: "Real Estate", agentId: process.env.RETELL_AGENT_ID || "agent_31f1d53632ea61ed0360e120d4" },
  "hotel-booking": { label: "Hotel Booking", agentId: "agent_73e3fc1b236e30f5958598f1d7" },
  "hotel-booking-ar": { label: "Hotel Booking (Arabic)", agentId: "agent_eab66806bc67d0b53de0ba56fb" },
  // Private use-case, shown only after the /callagents private login.
  "al-marmoom": { label: "Al Marmoom (Sara)", agentId: "agent_748e862bc7d2cf3081e7d14a5f" },
};

// Letters/spaces/'-. only, so nothing odd gets read out or injected into the prompt.
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

// The variables each demo's agent reads.
export function variablesFor(demoKey, { name, contact, email, callId }) {
  if (demoKey === "real-estate") return demoVariables({ name, contact, callId });
  if (demoKey === "al-marmoom") return { customer_name: name || "there", contact, contactNumber: contact, email };
  return hotelVariables({ name, contact });
}

// The hotel agents read these fields instead of the real estate lead fields.
export function hotelVariables({ name, contact }) {
  return {
    customer_name: name || "there",
    contactNumber: contact,
    hotel_name: "Devmate Hotel",
    enquiry_source: "Website demo",
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
