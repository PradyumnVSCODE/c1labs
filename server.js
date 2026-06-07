import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// sanity check root
app.get("/", (req, res) => {
  res.json({ status: "OK", message: "Continuum AI running" });
});

// test route
app.get("/test", (req, res) => {
  console.log("TEST ROUTE HIT");
  res.json({ success: true, route: "/test working" });
});

// fallback (so you NEVER see confusing errors)
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
