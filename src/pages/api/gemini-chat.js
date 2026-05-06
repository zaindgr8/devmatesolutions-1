/**
 * POST /api/gemini-chat
 * Body: { messages: [{ role: "user"|"assistant", content: string }] }
 * Calls Google Gemini with a Devmate Solutions manager persona.
 *
 * ✏️  To customise Sarah's personality, knowledge, and FAQs edit:
 *     src/components/gemini_chat/devmate-persona.js
 */

import { buildSystemPrompt } from "../../components/gemini_chat/devmate-persona";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === "YOUR_GEMINI_API_KEY_HERE") {
    console.warn("GEMINI_API_KEY is not set — returning placeholder response.");
    return res.status(200).json({
      reply:
        "Hi! I'm Sarah from Devmate Solutions. Our AI chat is almost live — in the meantime, visit devmatesolutions.com or book a meeting with our team. We'd love to hear from you! 🚀",
    });
  }

  const { messages = [] } = req.body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "messages array is required" });
  }

  // Build Gemini `contents` — map assistant → model, user → user
  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const geminiPayload = {
    system_instruction: {
      parts: [{ text: buildSystemPrompt() }],
    },
    contents,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1000,
      topP: 0.9,
      // Gemini 3 — keep thinking minimal for fast chat replies
      thinkingConfig: {
        thinkingLevel: "low",
      },
    },
    safetySettings: [
      { category: "HARM_CATEGORY_HARASSMENT",        threshold: "BLOCK_MEDIUM_AND_ABOVE" },
      { category: "HARM_CATEGORY_HATE_SPEECH",       threshold: "BLOCK_MEDIUM_AND_ABOVE" },
      { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
      { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
    ],
  };

  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(geminiPayload),
      }
    );

    if (!geminiRes.ok) {
      const errBody = await geminiRes.text();
      console.error("Gemini API error:", geminiRes.status, errBody);
      return res.status(502).json({ error: "Gemini API returned an error" });
    }

    const data = await geminiRes.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "I'm not sure how to answer that right now. Could you rephrase, or would you like me to connect you with our team directly?";

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("Gemini fetch error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
