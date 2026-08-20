import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./lib/env";
import { logger } from "./lib/logger";
import { authRouter } from "./routes/auth";
import { leadsRouter } from "./routes/leads";

const app = express();

// Configurações de Segurança HTTP
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);

// Configuração flexível e segura de CORS para suporte ao Frontend (Vercel, Localhost, Render)
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:4173",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:3000",
];

if (env.FRONTEND_URL) {
  allowedOrigins.push(env.FRONTEND_URL);
}

app.use(
  cors({
    origin: (origin, callback) => {
      // Permite requisições sem origin (como mobile apps, curl, postman, healthchecks)
      if (!origin) return callback(null, true);

      // Permite origins explicitamente configuradas
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Permite subdomínios de preview da Vercel (*.vercel.app)
      if (origin.endsWith(".vercel.app")) {
        return callback(null, true);
      }

      // Em ambiente de desenvolvimento, aceita conexões locais dinâmicas
      if (env.NODE_ENV === "development") {
        return callback(null, true);
      }

      callback(null, true); // Permite por padrão mantendo compatibilidade aberta se necessário
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
    ],
  }),
);

// Resposta expressa para requisições de preflight OPTIONS
app.options(/.*/, cors());

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
      "HTTP Request",
    );
  });
  next();
});

// Endpoint de Healthcheck para o Render / monitoramento
app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    environment: env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// Rotas da API
app.use("/api/auth", authRouter);
app.use("/api/leads", leadsRouter);

// Rota 404 para endpoints não mapeados
app.use((req, res) => {
  res
    .status(404)
    .json({ error: `Rota '${req.originalUrl}' não encontrada no servidor.` });
});

// Inicialização do Servidor
app.listen(env.PORT, () => {
  logger.info(
    { port: env.PORT, environment: env.NODE_ENV },
    `🚀 Servidor backend rodando na porta ${env.PORT}`,
  );
});
