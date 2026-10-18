/**
 * POST /api/freya-lead
 * Called once when a "Talk to Freya" voice call ends.
 * Body: { callId, durationSec, lead: { name, email, ... } | null, transcript: [{ role: "user"|"agent", text }] }
 * Sends the call summary + transcript to the team, and a confirmation to the visitor if Freya got their email.
 */
import { Resend } from "resend";

const MAX_TRANSCRIPT_LINES = 400;

const esc = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s || "").trim());

const FIELDS = [
  ["name", "Name"],
  ["email", "Email"],
  ["phone", "Phone / WhatsApp"],
  ["company", "Company"],
  ["country", "Country"],
  ["service", "Interested in"],
  ["budget", "Budget"],
  ["timeline", "Timeline"],
  ["meeting_time", "Meeting"],
  ["meeting_status", "Booking status"],
  ["meeting_url", "Meeting link"],
  ["summary", "Summary"],
];

const SCORE_COLORS = { Hot: "#c0392b", Warm: "#d97706", Cold: "#6b7280" };

// Gemini reads the call and writes the team a lead score + one-paragraph brief.
async function scoreLead({ lead, transcript }) {
  const apiKey = process.env.GEMINI_LIVE_API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey || !transcript.some((t) => t.role === "user")) return null;
  const model = process.env.FREYA_SCORING_MODEL || "gemini-3.8-flash";
  const convo = transcript.map((t) => `${t.role === "agent" ? "Freya" : "Visitor"}: ${t.text}`).join("\n");
  try {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: "POST",
      headers: { "x-goog-api-key": apiKey, "Content-Type": "application/json" },
      signal: AbortSignal.timeout(20_000),
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: "You qualify inbound leads for DevMate Solutions, an AI and software agency (projects roughly $2k to $15k+). Read the voice call and score the lead for the sales team. Be concise and factual; don't invent details." }],
        },
        contents: [{ role: "user", parts: [{ text: `Details captured: ${JSON.stringify(lead || {})}\n\nCall transcript:\n${convo}` }] }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              score: { type: "STRING", enum: ["Hot", "Warm", "Cold"] },
              intent: { type: "STRING", description: "What they want built or solved, in one sentence." },
              budget_signal: { type: "STRING", description: "Budget or buying signals, or 'Unknown'." },
              objections: { type: "STRING", description: "Concerns or objections raised, or 'None'." },
              next_step: { type: "STRING", description: "The single best next step for the team." },
              brief: { type: "STRING", description: "Two or three sentence brief for the salesperson." },
            },
            required: ["score", "intent", "next_step", "brief"],
          },
        },
      }),
    });
    const out = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(`${r.status} ${JSON.stringify(out.error || out).slice(0, 200)}`);
    return JSON.parse(out.candidates?.[0]?.content?.parts?.[0]?.text || "null");
  } catch (err) {
    console.error("Freya lead scoring failed:", err.message);
    return null;
  }
}

function insightsBlock(ai) {
  if (!ai) return "";
  const color = SCORE_COLORS[ai.score] || "#6b7280";
  const row = (label, value) =>
    value ? `<p style="margin:0 0 8px;font-size:14px;color:#374151;line-height:1.5;"><strong style="color:#0d0d0d;">${label}:</strong> ${esc(value)}</p>` : "";
  return `<tr><td style="padding:28px 40px 0;">
  <div style="border:1px solid #f0f0f0;border-left:4px solid ${color};border-radius:8px;padding:18px 20px;background:#fafafa;">
    <p style="margin:0 0 10px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:${color};">AI lead score · ${esc(ai.score)}</p>
    <p style="margin:0 0 12px;font-size:15px;color:#0d0d0d;line-height:1.6;">${esc(ai.brief)}</p>
    ${row("Intent", ai.intent)}${row("Budget signal", ai.budget_signal)}${row("Objections", ai.objections)}${row("Next step", ai.next_step)}
  </div>
</td></tr>`;
}

function shell(title, inner) {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8" /><title>${esc(title)}</title></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 0;"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
${inner}
</table></td></tr></table></body></html>`;
}

function teamEmail({ lead, transcript, durationSec, when, ai }) {
  const rows = FIELDS.filter(([k]) => lead?.[k])
    .map(
      ([k, label], i) => `<tr style="background:${i % 2 ? "#ffffff" : "#f9fafb"};">
  <td style="padding:12px 16px;font-size:12px;font-weight:700;text-transform:uppercase;color:#9ca3af;width:150px;vertical-align:top;">${label}</td>
  <td style="padding:12px 16px;font-size:15px;color:#0d0d0d;">${esc(lead[k])}</td></tr>`
    )
    .join("");
  const lines = transcript
    .map(
      (t) => `<p style="margin:0 0 10px;font-size:14px;line-height:1.5;color:#374151;">
  <strong style="color:${t.role === "agent" ? "#c0392b" : "#0d0d0d"};">${t.role === "agent" ? "Freya" : "Visitor"}:</strong> ${esc(t.text)}</p>`
    )
    .join("");
  const mins = `${Math.floor(durationSec / 60)}m ${durationSec % 60}s`;

  return shell(
    "Freya call summary",
    `<tr><td style="background:#0d0d0d;padding:28px 40px;">
  <h1 style="margin:0;color:#ffffff;font-size:18px;font-weight:800;">🎙️ New Freya voice call${lead?.meeting_time ? " — meeting requested" : ""}</h1>
  <p style="margin:6px 0 0;font-size:13px;color:#9ca3af;">${esc(when)} GST · ${mins}</p></td></tr>
${insightsBlock(ai)}
<tr><td style="padding:32px 40px 8px;">
  <h3 style="margin:0 0 16px;font-size:16px;font-weight:800;color:#0d0d0d;">Lead details</h3>
  ${
    rows
      ? `<table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #f0f0f0;border-radius:8px;overflow:hidden;">${rows}</table>`
      : `<p style="margin:0;font-size:14px;color:#6b7280;">The visitor didn't share contact details on this call.</p>`
  }
</td></tr>
<tr><td style="padding:24px 40px 32px;">
  <h3 style="margin:0 0 16px;font-size:16px;font-weight:800;color:#0d0d0d;">Transcript</h3>
  ${lines || `<p style="margin:0;font-size:14px;color:#6b7280;">No speech was captured.</p>`}
</td></tr>`
  );
}

function visitorEmail(lead) {
  const first = String(lead.name || "").split(" ")[0] || "there";
  return shell(
    "Thanks for talking to Freya",
    `<tr><td style="background:#0d0d0d;padding:32px 40px;text-align:center;">
  <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:800;"><span style="color:#c0392b;">Devmate</span> Solutions</h1></td></tr>
<tr><td style="padding:40px;">
  <p style="margin:0 0 8px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:#c0392b;">Thanks for the call</p>
  <h2 style="margin:0 0 16px;font-size:24px;font-weight:900;color:#0d0d0d;">Hi ${esc(first)}, great speaking with you!</h2>
  <p style="margin:0 0 16px;font-size:15px;color:#4b5563;line-height:1.7;">
    ${
      lead.meeting_time && String(lead.meeting_status || "").startsWith("Booked")
        ? `Your call with our team is booked for <strong>${esc(lead.meeting_time)}</strong>. The calendar invite with the video link comes from Cal.com to this email.`
        : `Our team has your details and will be in touch shortly.`
    }
  </p>
  <p style="margin:0;font-size:15px;color:#4b5563;line-height:1.7;">
    Need to change something? Just reply to this email or write to
    <a href="mailto:contact@devmatesolutions.com" style="color:#c0392b;text-decoration:none;">contact@devmatesolutions.com</a>.
  </p>
</td></tr>
<tr><td style="padding:24px 40px;text-align:center;border-top:1px solid #f0f0f0;">
  <p style="margin:0;font-size:12px;color:#9ca3af;">© ${new Date().getFullYear()} Devmate Solutions · Dubai · New York · Muscat</p></td></tr>`
  );
}

async function send(resend, msg) {
  let r = await resend.emails.send({ from: "Devmate Solutions <contact@devmatesolutions.com>", ...msg });
  // Same fallback as the other lead routes, for when the domain sender isn't verified.
  if (r.error) r = await resend.emails.send({ from: "Devmate Solutions <onboarding@resend.dev>", ...msg });
  return r;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  // sendBeacon posts text/plain, so the body may arrive as a string.
  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  const lead = body?.lead && typeof body.lead === "object" ? body.lead : null;
  const transcript = (Array.isArray(body?.transcript) ? body.transcript : [])
    .filter((t) => t && typeof t.text === "string" && t.text.trim())
    .slice(0, MAX_TRANSCRIPT_LINES)
    .map((t) => ({ role: t.role === "agent" ? "agent" : "user", text: t.text.trim().slice(0, 2000) }));
  const durationSec = Math.max(0, Math.min(3600, Math.round(Number(body?.durationSec) || 0)));

  // Nothing said and no details: don't email the team about an empty call.
  if (!lead && !transcript.some((t) => t.role === "user")) return res.status(200).json({ ok: true, skipped: true });

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY not configured");
    return res.status(500).json({ error: "Email service not configured" });
  }
  const resend = new Resend(process.env.RESEND_API_KEY);
  const to = (process.env.FREYA_LEADS_TO || "contact@devmatesolutions.com").split(",").map((s) => s.trim()).filter(Boolean);
  const when = new Date().toLocaleString("en-US", { timeZone: "Asia/Dubai", dateStyle: "full", timeStyle: "short" });
  const who = lead?.name ? `${lead.name}${lead.company ? ` (${lead.company})` : ""}` : "Anonymous visitor";

  const ai = await scoreLead({ lead, transcript });

  try {
    const team = await send(resend, {
      to,
      replyTo: isEmail(lead?.email) ? lead.email.trim() : undefined,
      subject: `${ai?.score === "Hot" ? "🔥" : "🎙️"} Freya call — ${who}${ai?.score ? ` · ${ai.score}` : ""}${lead?.meeting_time ? ` · meeting ${lead.meeting_time}` : ""}`,
      html: teamEmail({ lead, transcript, durationSec, when, ai }),
    });
    if (team.error) throw new Error(team.error.message || JSON.stringify(team.error));

    if (isEmail(lead?.email)) {
      const v = await send(resend, {
        to: [lead.email.trim()],
        subject: "Thanks for talking to Freya — Devmate Solutions",
        html: visitorEmail(lead),
      });
      if (v.error) console.error("Freya visitor email failed:", v.error);
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Freya lead email failed:", err.message);
    return res.status(500).json({ error: "Failed to send call summary" });
  }
}
