/**
 * POST /api/freya-token
 * Mints a short-lived, single-use Gemini Live token for the "Talk to Freya" voice agent.
 * Freya's model, voice, prompt and tools are locked into the token, so the browser talks to
 * Gemini directly without ever seeing the real API key or the prompt.
 */
import { FREYA_PROMPT, FREYA_TOOLS } from "../../lib/freya/prompt";

const LIVE_MODEL = "models/gemini-3.8-live";

function validTz(tz) {
  try { new Intl.DateTimeFormat("en-US", { timeZone: tz }); return tz; } catch { return "Asia/Dubai"; }
}

function dubaiNow() {
  return new Date().toLocaleString("en-US", {
    timeZone: "Asia/Dubai",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const apiKey = process.env.GEMINI_LIVE_API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_LIVE_API_KEY is not set");
    return res.status(503).json({ error: "Freya is offline right now. Please try again later." });
  }

  const visitorTz = validTz(req.body?.timezone);
  const now = Date.now();
  const token = {
    uses: 1,
    expireTime: new Date(now + 15 * 60_000).toISOString(), // the call must finish within 15 minutes
    newSessionExpireTime: new Date(now + 2 * 60_000).toISOString(), // and start within 2
    bidiGenerateContentSetup: {
      model: LIVE_MODEL,
      generationConfig: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: process.env.FREYA_VOICE || "Aoede" } },
        },
      },
      systemInstruction: {
        parts: [{ text: `${FREYA_PROMPT}\n\nCurrent time in Dubai: ${dubaiNow()}.\nThe visitor's browser time zone: ${visitorTz}.` }],
      },
      tools: [{ functionDeclarations: FREYA_TOOLS }],
      inputAudioTranscription: {},
      outputAudioTranscription: {},
    },
  };

  try {
    const r = await fetch("https://generativelanguage.googleapis.com/v1alpha/auth_tokens", {
      method: "POST",
      headers: { "x-goog-api-key": apiKey, "Content-Type": "application/json" },
      body: JSON.stringify(token),
      signal: AbortSignal.timeout(10_000),
    });
    const out = await r.json().catch(() => ({}));
    if (!r.ok || !out.name) {
      throw new Error(`Gemini token ${r.status}: ${JSON.stringify(out.error || out).slice(0, 300)}`);
    }
    return res.status(200).json({ token: out.name, model: LIVE_MODEL });
  } catch (err) {
    console.error("Create Freya token failed:", err.message);
    return res.status(502).json({ error: "We couldn't start the call. Please try again in a moment." });
  }
}
