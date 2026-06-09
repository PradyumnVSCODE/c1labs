import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function run(prompt) {
  const res = await groq.chat.completions.create({
    model: "llama3-70b-8192",
    messages: [{ role: "user", content: prompt }],
  });

  return res.choices[0]?.message?.content;
}

app.post("/api/chat", async (req, res) => {
  try {
    const message = req.body.message;
    
    if (!message) {
      return res.status(400).json({ error: "No message provided" });
    }

    const reply = await run(message);

    res.json({
      reply: reply || "No response",
    });

  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Continuum AI running on http://localhost:3000");
});
