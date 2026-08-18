import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { prisma } from "./lib/prisma";
import { leadsRouter } from "./routes/leads";
import "dotenv/config";

const app = express();
const PORT = 3333;

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
app.use("/api/leads", leadsRouter);
app.use(
  cors({
    origin: "*",
  }),
);

app.use(helmet());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
