import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./lib/env";
import { logger } from "./lib/logger";
import { leadsRouter } from "./routes/leads";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "100kb" }));

// Middleware de auditoria e logging estruturado de requisições HTTP
app.use((req, res, next) => {
  const startTime = Date.now();
  res.on("finish", () => {
    const responseTime = Date.now() - startTime;
    logger.info(
      {
        method: req.method,
        url: req.originalUrl,
        statusCode: res.statusCode,
        durationMs: responseTime,
        ip: req.ip,
      },
      "HTTP Request"
    );
  });
  next();
});

// Endpoint de Healthcheck
app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

// Rotas de API
app.use("/api/leads", leadsRouter);

// Inicialização do Servidor
app.listen(env.PORT, () => {
  logger.info(
    { port: env.PORT, environment: env.NODE_ENV },
    `🚀 Servidor rodando na porta ${env.PORT}`
  );
});
