import express from "express";
import axios from "axios";

const router = express.Router();

// 🔥 URL DA SUA PLANILHA
const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbxt1NxI_ONh44YPhzXmp4bfzcnQyKwy9ILOgp2nkcj6ZOZHuunr_8ssUxNUozLVOJQ2Zw/exec";

// 🔥 WEBHOOK MERCADO PAGO
router.post("/", async (req, res) => {
  try {
    console.log("🔥 WEBHOOK RECEBIDO");

    const { type, data } = req.body;

    // só processa pagamento
    if (type !== "payment") {
      return res.sendStatus(200);
    }

    const paymentId = data.id;
    console.log("💳 Payment ID:", paymentId);

    // 🔥 BUSCAR PAGAMENTO REAL NO MP
    const mpResponse = await axios.get(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        },
      }
    );

    const payment = mpResponse.data;

    console.log("📦 STATUS:", payment.status);
    console.log("💰 VALOR:", payment.transaction_amount);

    // 🔥 SÓ CONTINUA SE APROVADO
    if (payment.status !== "approved") {
      console.log("⚠️ Ainda não aprovado");
      return res.sendStatus(200);
    }

    // 🔥 DADOS IMPORTANTES
    const amount = payment.transaction_amount;
    const email = payment.payer?.email || "sem-email";
    const name = payment.payer?.first_name || "anonimo";

    console.log("✅ PAGAMENTO APROVADO!");
    console.log("👤 Nome:", name);
    console.log("📧 Email:", email);
    console.log("💵 Valor:", amount);

    // 🔥 SALVAR NA PLANILHA
    try {
      await axios.post(GOOGLE_SHEETS_URL, {
        nome: name,
        email: email,
        valor: amount,
      });

      console.log("📊 SALVO NA PLANILHA!");
    } catch (err) {
      console.error("❌ ERRO AO SALVAR NA PLANILHA:", err.message);
    }

    return res.sendStatus(200);

  } catch (error) {
    console.error("❌ ERRO WEBHOOK:", error.response?.data || error.message);
    return res.sendStatus(500);
  }
});

export default router;