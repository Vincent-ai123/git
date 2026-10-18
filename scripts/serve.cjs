const http = require("http");
const fs = require("fs");
const path = require("path");
const root = path.resolve(__dirname, "..");
const port = Number(process.env.PORT || 4173);
const mime = { ".html":"text/html; charset=utf-8", ".css":"text/css; charset=utf-8", ".js":"application/javascript; charset=utf-8", ".json":"application/json; charset=utf-8", ".svg":"image/svg+xml" };

http.createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  const relative = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  const filename = path.resolve(root, relative);
  if (!filename.startsWith(root + path.sep) && filename !== path.join(root, "index.html")) {
    response.writeHead(403); response.end("Forbidden"); return;
  }
  fs.readFile(filename, (error, body) => {
    if (error) { response.writeHead(404); response.end("Not found"); return; }
    response.writeHead(200, { "Content-Type": mime[path.extname(filename)] || "application/octet-stream" });
    response.end(body);
  });
}).listen(port, "127.0.0.1", () => console.log(`Career Skill Atlas: http://127.0.0.1:${port}`));
