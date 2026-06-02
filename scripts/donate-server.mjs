import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { fetchLeaderboardData } from "../lib/sociabuzz-leaderboard.mjs";

const root = join(fileURLToPath(new URL("..", import.meta.url)));
const requestedPort = Number(process.env.PORT || 8787);
const host = process.env.HOST || "127.0.0.1";

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml"
};

function sendJson(response, statusCode, body) {
  response.writeHead(statusCode, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store"
  });
  response.end(JSON.stringify(body));
}

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url || "/", `http://${request.headers.host}`);

    if (url.pathname === "/api/leaderboard") {
      const data = await fetchLeaderboardData();
      sendJson(response, 200, {
        ok: true,
        updatedAt: new Date().toISOString(),
        ...data
      });
      return;
    }

    const filePath = url.pathname === "/" ? "donate.html" : url.pathname.slice(1);
    const absolutePath = join(root, filePath);
    const content = await readFile(absolutePath);
    const contentType = contentTypes[extname(absolutePath)] || "application/octet-stream";

    response.writeHead(200, { "content-type": contentType });
    response.end(content);
  } catch (error) {
    if (error.code === "ENOENT") {
      response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    sendJson(response, 500, {
      ok: false,
      error: error.message || "Internal server error"
    });
  }
});

function listen(port, attemptsLeft = 20) {
  const handleError = (error) => {
    if ((error.code === "EADDRINUSE" || error.code === "EPERM") && attemptsLeft > 0) {
      listen(port + 1, attemptsLeft - 1);
      return;
    }

    if (error.code === "EADDRINUSE") {
      console.error(`Port ${requestedPort}-${port} sedang dipakai. Tutup server lama atau set PORT lain.`);
      process.exit(1);
    }

    if (error.code === "EPERM") {
      console.error(`Tidak diizinkan listen di ${host}:${requestedPort}-${port}. Coba jalankan dari terminal biasa.`);
      process.exit(1);
    }

    throw error;
  };

  server.once("error", handleError);
  server.listen(port, host, () => {
    server.off("error", handleError);
    console.log(`Donate overlay ready: http://${host}:${port}/donate.html`);
  });
}

listen(requestedPort);
