import express from "express";
import { MercadoPagoConfig, Preference } from "mercadopago";
const { name, amount } = req.body;

const router = express.Router();

router.post("/", async (req, res) => {
  try {
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
      },
    });

    return res.json({
      url: response.init_point,
    });
  } catch (error) {
    console.error("🔥 ERRO:", error);
    return res.status(500).json({ error: "Erro ao criar pagamento" });
  }
});

export default router;
