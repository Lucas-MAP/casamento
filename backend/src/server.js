import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import confirmRoutes from "./routes/confirm.js";
import paymentRoutes from "./routes/payment.js";
import webhookRoutes from "./routes/webhook.js";

dotenv.config();


const app = express();

// 🔐 HEADERS
app.use(helmet());

// 🔐 RATE LIMIT
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

// 🔐 CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://lucas-map.github.io",
      "https://convite-lj.duckdns.org",
    ],
  })
);

// 🔐 LIMIT BODY
app.use(express.json({ limit: "10kb" }));

// 🔥 ROTAS
app.use("/api/confirm", confirmRoutes);
app.use("/api", paymentRoutes);
app.use("/api/webhook", webhookRoutes);


// 🔥 TESTE
app.get("/", (req, res) => {
  res.send("API rodando 🚀");
});

// 🔥 MONGO
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🔥 MongoDB conectado"))
  .catch((err) => console.log("❌ Mongo erro:", err));

// 🔥 START
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server rodando na porta ${PORT}`);
});
