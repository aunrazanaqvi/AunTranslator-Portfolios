// Tiny static server for the portfolio. Run with: npm start
const http = require("http");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const PORT = process.env.PORT || 8765;
const ROOT = __dirname;
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
};

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split("?")[0]);
  if (urlPath === "/") urlPath = "/index.html";
  const file = path.normalize(path.join(ROOT, urlPath));
  if (!file.startsWith(ROOT)) {
    res.writeHead(403);
    return res.end("Forbidden");
  }
  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404);
      return res.end("Not found");
    }
    res.writeHead(200, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream" });
    res.end(data);
  });
});

server.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log(`Portfolio running at ${url}  (press Ctrl+C to stop)`);
  if (process.argv.includes("--no-open")) return;
  // Open in the default browser
  const cmd =
    process.platform === "win32" ? `start "" "${url}"` :
    process.platform === "darwin" ? `open "${url}"` : `xdg-open "${url}"`;
  exec(cmd);
});
