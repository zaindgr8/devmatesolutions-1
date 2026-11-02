/**
 * POST /api/retell-web-call   { customer_name? }
 * Creates a Retell web call for the in-browser "talk to Freya" demo and returns what the
 * Retell Web SDK needs to join it. Freya greets the visitor by the name they typed.
 */
import { DEMO_AGENT_ID, cleanName, demoVariables, retell } from "../../lib/retellDemo";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!process.env.RETELL_API_KEY) return res.status(503).json({ error: "The voice demo is offline right now." });

  const name = cleanName(req.body?.customer_name);
  const callId = `web-${Date.now().toString(36)}`;

  try {
    const r = await retell("/v3/create-web-call", {
      agent_id: DEMO_AGENT_ID,
      metadata: { source: "callagents_web_demo", demo_id: callId },
      retell_llm_dynamic_variables: demoVariables({ name, callId }),
    });
    if (!r.ok || !r.json.access_token) throw new Error(`${r.status} ${JSON.stringify(r.json).slice(0, 200)}`);
    const { access_token, call_id, transport, ice_servers } = r.json;
    return res.status(200).json({ access_token, call_id, transport, ice_servers });
  } catch (err) {
    console.error("Retell web call failed:", err.message);
    return res.status(502).json({ error: "Couldn't start the call. Please try again." });
  }
}
