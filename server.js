console.log("🔥 BOOT FILE ACTIVE");

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const Groq = require("groq-sdk");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

function buildAgents(prompt) {
  return {
    research: `Research deeply: ${prompt}`,
    compare: `Compare clearly: ${prompt}`,
    ideas: `Give ideas: ${prompt}`,
  };
}

async function run(prompt) {
  const res = await groq.chat.completions.create({
    model: "llama3-70b-8192",
    messages: [{ role: "user", content: prompt }],
  });

  return res.choices[0]?.message?.content;
}

app.get("/test", (req, res) => {
  res.json({ ok: true });
});

app.post("/api/chat", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const agents = buildAgents(prompt);

    const [research, compare, ideas] = await Promise.all([
      run(agents.research),
      run(agents.compare),
      run(agents.ideas),
    ]);

    res.json({ research, compare, ideas });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Continuum AI running on http://localhost:3000");
});
