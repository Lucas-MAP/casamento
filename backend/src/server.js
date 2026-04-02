import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import confirmRoutes from "./routes/confirm.js";
import paymentRoutes from "./routes/payment.js";

dotenv.config();

const app = express();

// 🔥 MIDDLEWARES
app.use(cors());
app.use(express.json());

// 🔥 ROTAS
app.use("/confirm", confirmRoutes);
app.use("/payment", paymentRoutes);

console.log("tokenMP:", process.env.MP_ACCESS_TOKEN);

// 🔥 TESTE RÁPIDO
app.get("/", (req, res) => {
  res.send("API rodando 🚀");
});

// 🔥 CONEXÃO MONGO
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🔥 MongoDB conectado"))
  .catch((err) => console.log("❌ Mongo erro:", err));

// 🔥 START SERVER (CORRIGIDO AQUI 👇)
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server rodando na porta ${PORT}`);
});