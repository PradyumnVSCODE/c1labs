console.log("🔥 FILE LOADED - THIS MUST APPEAR");

const express = require("express");
const app = express();

console.log("🔥 EXPRESS INIT OK");

app.get("/test", (req, res) => {
  console.log("🔥 TEST ROUTE HIT");
  res.json({ ok: true });
});

app.listen(3000, () => {
  console.log("🚀 SERVER RUNNING");
});
