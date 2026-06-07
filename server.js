console.log("🔥 SERVER FILE LOADED");

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  console.log("TEST HIT");
  res.json({ ok: true });
});

app.post("/api/chat", (req, res) => {
  console.log("CHAT HIT");
  res.json({ ok: true });
});

app.listen(3000, () => {
  console.log("🚀 Running on http://localhost:3000");
});
