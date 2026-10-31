export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.RETELL_API_KEY || "key_2da9e1e85942a0ee5c28b6686984";
  const agentId = req.body?.agent_id || process.env.RETELL_AGENT_ID || "agent_99b7b8c0593b742b4e0aac4bf2";

  try {
    const response = await fetch("https://api.retellai.com/v3/create-web-call", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        agent_id: agentId,
        metadata: {
          source: "devmate_callagents_bubbly_widget",
          timestamp: Date.now(),
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Retell API create-web-call error:", data);
      return res.status(response.status).json({
        error: data.message || "Failed to create web call with Retell AI",
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error creating Retell web call:", error);
    return res.status(500).json({ error: "Internal server error starting voice call" });
  }
}
