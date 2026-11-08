/**
 * POST /api/retell-web-call   { demo, customer_name, contact, email }
 * Creates a Retell web call for a /callagents voice demo and returns what the Retell Web SDK needs
 * to join it. The agent greets the visitor by name, and the team gets their details by email.
 */
import { Resend } from "resend";
import { validateDemoLead } from "../../lib/demoLead";
import { DEMO_AGENTS, cleanName, retell, variablesFor } from "../../lib/retellDemo";

const LEADS_TO = "management@devmatesolutions.com";

const esc = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// Sent whether or not the call connects, so a failed call never loses the lead.
async function emailLead({ demo, name, contact, email, callId }) {
  if (!process.env.RESEND_API_KEY) throw new Error("RESEND_API_KEY is not set");
  const rows = [
    ["Name", name],
    ["Contact number", contact],
    ["Email", email],
    ["Demo", demo.label],
    ["Call", callId || "Did not connect"],
  ];
  const { error } = await new Resend(process.env.RESEND_API_KEY).emails.send({
    from: process.env.RESEND_FROM_EMAIL || "DevMate Solutions <contact@devmatesolutions.com>",
    to: [LEADS_TO],
    replyTo: email,
    subject: `Voice demo lead: ${name} (${demo.label})`,
    html: `<h2>New voice demo lead</h2><table cellpadding="6">${rows
      .map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${esc(v)}</td></tr>`)
      .join("")}</table>`,
  });
  if (error) throw new Error(error.message);
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!process.env.RETELL_API_KEY) return res.status(503).json({ error: "The voice demo is offline right now." });

  const demo = Object.hasOwn(DEMO_AGENTS, req.body?.demo) ? DEMO_AGENTS[req.body.demo] : null;
  const name = cleanName(req.body?.customer_name);
  const contact = String(req.body?.contact || "").replace(/[^\d+()\s-]/g, "").trim().slice(0, 24);
  const email = String(req.body?.email || "").trim().slice(0, 120);

  if (!demo) return res.status(400).json({ error: "Please choose a demo." });
  const errors = validateDemoLead({ customer_name: req.body?.customer_name, contact: req.body?.contact, email });
  if (Object.keys(errors).length) return res.status(400).json({ error: Object.values(errors)[0], errors });

  const demoId = `web-${Date.now().toString(36)}`;
  const variables = variablesFor(req.body.demo, { name, contact, email, callId: demoId });

  let call = null;
  try {
    const r = await retell("/v3/create-web-call", {
      agent_id: demo.agentId,
      metadata: { source: "callagents_web_demo", demo_id: demoId },
      retell_llm_dynamic_variables: variables,
    });
    if (!r.ok || !r.json.access_token) throw new Error(`${r.status} ${JSON.stringify(r.json).slice(0, 200)}`);
    call = r.json;
  } catch (err) {
    console.error("Retell web call failed:", err.message);
  }

  try {
    await emailLead({ demo, name, contact, email, callId: call?.call_id });
  } catch (err) {
    console.error("Voice demo lead email failed:", err.message);
  }

  if (!call) return res.status(502).json({ error: "Couldn't start the call. Please try again." });
  const { access_token, call_id, transport, ice_servers } = call;
  return res.status(200).json({ access_token, call_id, transport, ice_servers });
}
