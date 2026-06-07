console.log("🔥 CLEAN FILE IS RUNNING");

import http from "http";

http.createServer((req, res) => {
  console.log("REQUEST:", req.url);
  res.end("OK " + req.url);
}).listen(3000, "127.0.0.1");

console.log("LISTENING 3000");
