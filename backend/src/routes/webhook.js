import express from "express";

const router = express.Router();

// 🔥 WEBHOOK DO MERCADO PAGO
router.post("/", async (req, res) => {
  try {
    console.log("🔥 WEBHOOK RECEBIDO:");
    console.log(req.body);

    return res.sendStatus(200);
  } catch (error) {
    console.error("❌ ERRO WEBHOOK:", error);
    return res.sendStatus(500);
  }
});

export default router;