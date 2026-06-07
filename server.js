import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Continuum AI running");
});

app.get("/test", (req, res) => {
  res.send("TEST OK");
});

app.listen(PORT, () => {
  console.log(`Continuum AI running on http://localhost:${PORT}`);
});
