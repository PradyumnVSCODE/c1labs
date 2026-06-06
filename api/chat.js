import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    console.log("1. API HIT");

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    console.log("2. KEY EXISTS:", !!process.env.OPENAI_API_KEY);

    const body = req.body || {};
    console.log("3. BODY:", body);

    const message = body.message;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are Continuum OS AI." },
        { role: "user", content: message },
      ],
    });

    console.log("4. OPENAI SUCCESS");

    return res.status(200).json({
      reply: response.choices[0].message.content,
    });

  } catch (err) {
    console.log("🔥 FULL ERROR:", err);

    return res.status(500).json({
      error: err.message,
    });
  }
}
