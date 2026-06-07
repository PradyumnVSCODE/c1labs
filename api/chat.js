import Groq from "groq-sdk";

export default async function handler(req, res) {
  try {
    return res.status(200).json({
      status: "API IS WORKING",
      method: req.method,
      body: req.body || null
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
