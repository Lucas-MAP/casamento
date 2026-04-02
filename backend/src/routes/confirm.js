import express from "express";
import GuestConfirmation from "../models/GuestConfirmation.js";

const router = express.Router();

// 🔐 NORMALIZAÇÃO
const normalize = (str) =>
  str
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

// 🔐 SANITIZAÇÃO
const sanitize = (str) => str.replace(/[<>$]/g, "");

// 🔐 VALIDAÇÃO
function validateInput(name, guestsCount) {
  if (!name || typeof name !== "string") {
    return "Nome inválido";
  }

  const clean = name.trim();

  if (clean.length < 2 || clean.length > 100) {
    return "Nome inválido";
  }

  if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(clean)) {
    return "Nome contém caracteres inválidos";
  }

  if (!Number.isInteger(guestsCount)) {
    return "Quantidade inválida";
  }

  if (guestsCount < 1 || guestsCount > 5) {
    return "Quantidade inválida";
  }

  return null;
}

// 🔥 POST
router.post("/", async (req, res) => {
  try {
    let { name, guestsCount, isGodfather } = req.body;

    name = sanitize(name);

    const error = validateInput(name, guestsCount);
    if (error) {
      return res.status(400).json({ error });
    }

    const cleanName = name.trim();
    const normalizedName = normalize(cleanName);

    // 🔒 DUPLICADO REAL
    const existingGuest = await GuestConfirmation.findOne({
      normalizedName,
    });

    if (existingGuest) {
      return res.status(400).json({
        error: "Este nome já confirmou presença 💙",
      });
    }

    const newGuest = new GuestConfirmation({
      name: cleanName,
      normalizedName,
      guestsCount,
      isGodfather: Boolean(isGodfather),
    });

    await newGuest.save();

    res.status(201).json({
      message: "Confirmado com sucesso 🔥",
    });

  } catch (error) {
    console.error("ERRO CONFIRM:", error);
    res.status(500).json({
      error: "Erro interno",
    });
  }
});

// 🔥 GET
router.get("/", async (req, res) => {
  try {
    const guests = await GuestConfirmation.find().sort({ confirmedAt: -1 });
    res.json(guests);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar dados" });
  }
});

// 🔥 EXPORT
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