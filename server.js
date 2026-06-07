const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

console.log("SERVER LOADED ✔");

/* =========================
   HEALTH CHECK
========================= */
app.get("/test", (req, res) => {
  res.json({ ok: true });
});

/* =========================
   CHAT ROUTE (SAFE MOCK)
========================= */
app.post("/api/chat", (req, res) => {
  const prompt = req.body.prompt;

  console.log("RECEIVED:", prompt);

  return res.json({
    research: "AI Research: " + prompt,
    compare: "AI Comparison: " + prompt,
    ideas: "AI Ideas: " + prompt
  });
});

/* =========================
   OPTIONAL: SERVE FRONTEND
   (so you stop file:// issues)
========================= */
app.use(express.static(__dirname));

app.listen(3000, () => {
  console.log("Continuum AI running on http://localhost:3000");
});
