import http from "http";

http.createServer((req, res) => {
  console.log("HIT:", req.url);

  res.end("OK");
}).listen(3000, "0.0.0.0");
