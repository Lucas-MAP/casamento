import express from "express";
import GuestConfirmation from "../models/GuestConfirmation.js";

const router = express.Router();


// 🔥 POST - salvar confirmação

router.post("/", async (req, res) => {
  try {
    const { name, guestsCount, isGodfather } = req.body;

    const newGuest = new GuestConfirmation({
      name,
      guestsCount,
      isGodfather,
    });

    await newGuest.save();

    res.status(201).json({ message: "Confirmado com sucesso 🔥" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao salvar" });
  }
});


// 🔥 GET - listar confirmações

router.get("/", async (req, res) => {
  try {
    const guests = await GuestConfirmation.find();
    res.json(guests);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar dados" });
  }
});


// 🔥 GET - exportar CSV (PLANILHA)

router.get("/export", async (req, res) => {
  try {
    const confirmations = await GuestConfirmation.find();

    const csv = [
      ["Nome", "Quantidade", "Padrinho", "Data"],
      ...confirmations.map((c) => [
        c.name,
        c.guestsCount,
        c.isGodfather ? "Sim" : "Não",
        new Date(c.confirmedAt).toLocaleString("pt-BR"),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    res.header("Content-Type", "text/csv");
    res.attachment("convidados.csv");
    res.send(csv);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao exportar dados" });
  }
});

export default router;