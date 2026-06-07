console.log(">>> THIS SERVER FILE IS ACTIVE <<<");

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

console.log("🔥 SERVER FILE IS RUNNING");

/* TEST ROUTE */
app.get("/test", (req, res) => {
  console.log("TEST HIT");
  res.json({ ok: true });
});

/* CHAT ROUTE */
app.post("/api/chat", (req, res) => {
  console.log("CHAT HIT:", req.body);

  res.json({
    research: "OK",
    compare: "OK",
    ideas: "OK"
  });
});

app.listen(3000, () => {
  console.log("🚀 Running on http://localhost:3000");
});
