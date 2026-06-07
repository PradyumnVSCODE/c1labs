console.log("🔥 SERVER BOOT");

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  console.log("TEST ROUTE HIT");
  res.json({ ok: true });
});

app.post("/api/chat", (req, res) => {
  console.log("CHAT HIT:", req.body);

  res.json({
    research: "OK",
    compare: "OK",
    ideas: "OK"
  });
});

app.listen(3000, () => {
  console.log("🚀 RUNNING http://localhost:3000");
});
