import http from "http";

console.log("🔥 NEW SERVER LOADED");

http.createServer((req, res) => {
  console.log("REQUEST HIT:", req.url);

  res.end("OK " + req.url);
}).listen(3000, "127.0.0.1");

console.log("RUNNING CLEAN SERVER ON 3000");
