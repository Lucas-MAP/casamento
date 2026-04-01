import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: "COLE_AQUI_SEU_TOKEN_NOVO",
});

const preference = new Preference(client);

async function testar() {
  try {
    const response = await preference.create({
      body: {
        items: [
          {
            title: "Teste simples",
            quantity: 1,
            currency_id: "BRL",
            unit_price: 50,
          },
        ],
      },
    });

    console.log("✅ SUCESSO:");
    console.log(response.init_point);

  } catch (error) {
    console.log("❌ ERRO COMPLETO:");
    console.log(error);
  }
}

testar();