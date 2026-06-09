const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const Groq = require("groq-sdk");
const path = require("path");

dotenv.config();

const __dirname = path.dirname(require.main.filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const groq = new Groq.default({
  apiKey: process.env.GROQ_API_KEY || "",
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
    console.log("Received message:", message);
    console.log("API Key present:", !!process.env.GROQ_API_KEY);
    
    if (!message) {
      return res.status(400).json({ error: "No message provided" });
    }

    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({ error: "GROQ_API_KEY not configured" });
    }

    const reply = await run(message);
    console.log("Got reply:", reply);

    res.json({
      reply: reply || "No response",
    });

  } catch (err) {
    console.error("Error in /api/chat:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Continuum AI running on http://localhost:3000");
});
