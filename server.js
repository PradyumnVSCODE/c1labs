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

const buildAgents = (prompt) => ({
  research: `Research deeply and explain: ${prompt}`,
  compare: `Compare options clearly: ${prompt}`,
  ideas: `Generate creative ideas: ${prompt}`,
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
    const prompt = req.body.prompt;

    const agents = buildAgents(prompt);

    const [research, compare, ideas] = await Promise.all([
      run(agents.research),
      run(agents.compare),
      run(agents.ideas),
    ]);

    res.json({
      research,
      compare,
      ideas,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Continuum AI running on http://localhost:3000");
});
