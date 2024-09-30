import next from "next";
import { middleware } from "./middleware";
const express = require("express");
const path = require("path");

const server = express();

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  server.post("/logging", (req: any, res: any) => {
    const err = req.body;
    const header = req.headers;
    if (header?.iserror) {
      console.log(err);
    }
    return res.json({ message: "success" });
  });

  server.get(
    [
      "/favicon.ico",
      "/service-worker.js",
      "/robots.txt",
      "/.well-known",
      "/assets/*",
      "/apple-app-site-association",
    ],
    express.static(path.join(__dirname, "../public"))
  );
  server.get(middleware);
  // any redirect for urls that are not in the list

  server.all("*", (req: any, res: any) => {
    if (!req?.url?.includes("_next") && !req?.locals?.opsId) {
      return res.redirect(302);
    }
    return handle(req, res);
  });
  server.listen(port, () => {
    console.info(`Server Ready on ${port}`);
    console.log(`> Ready on http://localhost:${port}`);
  });
});
