import OpenAI from "openai";

export default async function handler(req, res) {
  try {

    if (req.method !== "POST") {
      return res.status(405).json({ error: "Use POST" });
    }

    const body = req.body?.message ? req.body : JSON.parse(req.body || "{}");
    const message = body.message;

    if (!message) {
      return res.status(400).json({ error: "No message received" });
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are Continuum OS AI." },
        { role: "user", content: message }
      ]
    });

    const reply = response?.choices?.[0]?.message?.content;

    return res.status(200).json({
      reply: reply || "No response from model"
    });

  } catch (err) {
    console.log(err);

    return res.status(500).json({
      error: err.message,
      reply: "Server error"
    });
  }
}
