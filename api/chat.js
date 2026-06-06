import OpenAI from "openai";

export const config = {
  runtime: "nodejs"
};

export default async function handler(req, res) {
  try {

    if (req.method !== "POST") {
      return res.status(405).json({ error: "Use POST" });
    }

    const body = req.body || {};
    const message = body.message;

    if (!message) {
      return res.status(400).json({ error: "No message provided" });
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

    return res.status(200).json({
      reply: response.choices[0].message.content
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: err.message
    });
  }
}
