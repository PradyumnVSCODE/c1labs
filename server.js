import express from "express";

const app = express();
const PORT = 3000;

console.log("🔥 SERVER FILE ACTIVE");

app.get("/", (req, res) => {
  res.send("HOME OK");
});

app.get("/test", (req, res) => {
  console.log("TEST HIT");
  res.send("TEST OK");
});

app.listen(PORT, () => {
  console.log("SERVER RUNNING ON 3000");
});
