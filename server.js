import express from "express";

const app = express();

app.get("/test", (req, res) => {
  console.log("NEW SERVER HIT");
  res.send("FRESH OK");
});

app.listen(3000, () => {
  console.log("FRESH SERVER RUNNING");
});
