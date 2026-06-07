const express = require("express");
const cors = require("cors");

const app = express();

/* =======================
   MIDDLEWARE
======================= */
app.use(cors());
app.use(express.json());

/* =======================
   HEALTH CHECK ROUTE
======================= */
app.get("/test", (req, res) => {
  res.json({
    status: "ok",
    message: "Continuum backend alive"
  });
});

/* =======================
   CHAT ROUTE (SAFE MOCK FIRST)
   (NO GROQ YET — STABILITY FIRST)
======================= */
app.post("/api/chat", (req, res) => {
  try {
    const prompt = req.body?.prompt;

    console.log("📩 REQUEST:", prompt);

    if (!prompt) {
      return res.status(400).json({
        error: "No prompt received"
      });
    }

    // SAFE MOCK RESPONSE (NO CRASH POSSIBLE)
    return res.json({
      research: `Research analysis for: ${prompt}`,
      compare: `Comparison layer processed for: ${prompt}`,
      ideas: `Ideas generated from: ${prompt}`
    });

  } catch (err) {
    console.log("❌ SERVER ERROR:", err);

    return res.status(500).json({
      error: "Internal server error",
      details: err.message
    });
  }
});

/* =======================
   START SERVER
======================= */
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🚀 Continuum AI running on http://localhost:${PORT}`);
});
