import http from "http";

console.log("🔥 FRESH SERVER STARTED");

http.createServer((req, res) => {
  console.log("REQ:", req.url);

  res.end("OK " + req.url);
}).listen(3000, "127.0.0.1", () => {
  console.log("RUNNING ON 127.0.0.1:3000");
});
