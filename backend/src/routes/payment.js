import express from "express";
import { MercadoPagoConfig, Preference } from "mercadopago";

const router = express.Router();

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

const preference = new Preference(client);

// ⚠️ AQUI É "/" E NÃO "/payment"
router.post("/", async (req, res) => {
  try {
    const { name, amount } = req.body;

    const response = await preference.create({
      body: {
        items: [
          {
            title: `Presente casamento - ${name}`,
            quantity: 1,
            currency_id: "BRL",
            unit_price: Number(amount),
          },
        ],
        back_urls: {
          success: "http://localhost:5173/sucesso",
          failure: "http://localhost:5173/erro",
          pending: "http://localhost:5173/pendente",
        },
        auto_return: "approved",
      },
    });

    res.json({
      url: response.init_point,
    });

  } catch (error) {
    console.log("🔥 ERRO COMPLETO:", error);
    res.status(500).json({ error: "Erro ao criar pagamento" });
  }
});

export default router;