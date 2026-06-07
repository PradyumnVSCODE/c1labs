console.log("🔥 SERVER STARTING");

const express = require("express");
const app = express();

console.log("🔥 EXPRESS LOADED");

app.get("/test", (req, res) => {
  console.log("🔥 TEST HIT");
  res.json({ ok: true });
});

app.listen(3000, () => {
  console.log("🚀 RUNNING ON 3000");
});
