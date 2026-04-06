import express from "express";
import { MercadoPagoConfig, Preference } from "mercadopago";

const router = express.Router();

router.post("/payment", async (req, res) => {
  try {
    const { name, amount } = req.body;

    if (!name || !amount) {
      return res.status(400).json({
        error: "Dados inválidos",
      });
    }

    // DEBUG

    const client = new MercadoPagoConfig({
      accessToken: process.env.MP_ACCESS_TOKEN,
    });

    const preference = new Preference(client);

    const response = await preference.create({
      body: {
        items: [
          {
            title: name,
            quantity: 1,
            unit_price: Number(amount),
          },
        ],

        // 🔥 WEBHOOK (ESSENCIAL)
        notification_url: "https://convite-lj.duckdns.org/api/webhook",

        // 🔙 Redirecionamento
        back_urls: {
          success: "https://convite-lj.duckdns.org",
          failure: "https://convite-lj.duckdns.org",
          pending: "https://convite-lj.duckdns.org",
        },

        auto_return: "approved",
      },
    });

    console.log("🔍 RESPONSE COMPLETA:");
    console.dir(response, { depth: null });

    return res.json({
      url: response.init_point,
    });
  } catch (error) {
    console.error("🔥 ERRO:", error);
    return res.status(500).json({
      error: "Erro ao criar pagamento",
    });
  }
});

export default router;
