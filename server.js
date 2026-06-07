import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/test", (req, res) => {
  res.send("Test route works");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
