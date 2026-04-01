import express from "express";
import { MercadoPagoConfig, Preference } from "mercadopago";

const router = express.Router();
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });
const preference = new Preference(client);

router.post("/", async (req, res) => {
  try {
    const { amount, name } = req.body;

    const response = await preference.create({
      body: {
        items: [{
          id: "item-001",
          title: `Presente: ${name || 'Convidado'}`,
          quantity: 1,
          unit_price: Number(amount),
          currency_id: "BRL"
        }],
        payer: {
          email: "test_user_6768548428094377047@testuser.com" 
        },
        // URLs simples para não ter erro de redirecionamento
        back_urls: {
          success: "https://www.google.com",
          failure: "https://www.google.com"
        },
        auto_return: "approved"
      }
    });

    console.log("✅ DEU CERTO! URL gerada.");
    res.json({ url: response.init_point });

  } catch (error) {
    console.error("🔥 ERRO DO POLICY AGENT:");
    // Se o erro tiver uma causa (que é onde o PolicyAgent se esconde), ele vai mostrar
    console.log(JSON.stringify(error.cause || error, null, 2));

    res.status(500).json({ 
      error: "Erro ao criar pagamento",
      details: error.message,
      reason: error.cause?.message || "Bloqueio de política do Mercado Pago"
    });
  }
});

export default router;