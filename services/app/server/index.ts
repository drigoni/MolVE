
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import fs from "fs";
import https from "https";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);

    const port = 5000;
    server.listen({
      port,
      host: "0.0.0.0",
      reusePort: true,
    }, () => {
      log(`serving HTTP (dev) on port ${port}`);
    });
  } else {
    // Production: serve static assets and prefer HTTPS if certs are available
    serveStatic(app);

    const certPath = process.env.SSL_CERT_PATH || "/app/certs/cert.pem";
    const keyPath = process.env.SSL_KEY_PATH || "/app/certs/key.pem";
    const httpsPort = 443;
    const httpPort = 5000;

    let useHttps = false;
    let credentials: { key?: Buffer; cert?: Buffer } = {};
    try {
      credentials = {
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath),
      };
      useHttps = true;
    } catch (err) {
      log("SSL certificates not found or invalid, falling back to HTTP.");
    }

    if (useHttps) {
      https.createServer(credentials, app).listen(httpsPort, "0.0.0.0", () => {
        log(`serving HTTPS on port ${httpsPort}`);
      });
    } else {
      server.listen({
        port: httpPort,
        host: "0.0.0.0",
        reusePort: true,
      }, () => {
        log(`serving HTTP on port ${httpPort}`);
      });
    }
  }
})();
