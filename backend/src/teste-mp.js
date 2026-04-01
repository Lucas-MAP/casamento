import { MercadoPagoConfig, Preference } from "mercadopago";
import dotenv from "dotenv";

dotenv.config();

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

const preference = new Preference(client);

(async () => {
  try {
    const response = await preference.create({
      body: {
        items: [
          {
            title: "Teste",
            quantity: 1,
            currency_id: "BRL",
            unit_price: 10,
          },
        ],
      },
    });

    console.log("SUCESSO:", response.init_point);
  } catch (error) {
    console.log("ERRO REAL:", error);
  }
})();