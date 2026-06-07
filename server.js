console.log("🔥 THIS IS THE FILE BEING EXECUTED");
console.log("PATH CHECK:", import.meta.url);

import http from "http";

console.log("SERVER IS LIVE");

http.createServer((req, res) => {
  console.log("GOT REQUEST:", req.url);
  res.end("OK " + req.url);
}).listen(3000, "127.0.0.1");

console.log("LISTENING ON 3000");
