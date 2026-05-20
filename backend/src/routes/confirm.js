import express from "express";
import axios from "axios"; 
import GuestConfirmation from "../models/GuestConfirmation.js";

const router = express.Router();

// nova URL
const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbwahn6OuqwPOMQgW_muBVlTUy1Y0uCA_bGcfnQE8O2snU6dZ4MVPUpr9m9XuKlzK2dWQw/exec";

const normalize = (str) =>
  str
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const sanitize = (str) => str.replace(/[<>$]/g, "");

function validateInput(name, guestsCount) {
  if (!name || typeof name !== "string") return "Nome inválido";
  const clean = name.trim();
  if (clean.length < 2 || clean.length > 100) return "Nome inválido";
  if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(clean)) return "Nome contém caracteres inválidos";
  if (!Number.isInteger(guestsCount)) return "Quantidade inválida";
  if (guestsCount < 1 || guestsCount > 5) return "Quantidade inválida";
  return null;
}

router.post("/", async (req, res) => {
  try {
    let { name, guestsCount, isGodfather, isGodmother } = req.body;
    name = sanitize(name);

    const error = validateInput(name, guestsCount);
    if (error) return res.status(400).json({ error });

    const cleanName = name.trim();
    const normalizedName = normalize(cleanName);

    const existingGuest = await GuestConfirmation.findOne({ normalizedName });
    if (existingGuest) {
      return res.status(400).json({ error: "Este nome já confirmou presença 💙" });
    }

    const newGuest = new GuestConfirmation({
      name: cleanName,
      normalizedName,
      guestsCount,
      isGodfather: Boolean(isGodfather),
      isGodmother: Boolean(isGodmother),
    });

    await newGuest.save();

    try {
      await axios.post(GOOGLE_SHEETS_URL, {
        action: "confirm",
        nome: cleanName,
        guestsCount: guestsCount,
        data: new Date().toLocaleString("pt-BR"),
      });
    } catch (err) {
      console.error("❌ Erro Planilha:", err.message);
    }

    res.status(201).json({ message: "Confirmado com sucesso 🔥" });
  } catch (error) {
    console.error("ERRO CONFIRM:", error);
    res.status(500).json({ error: "Erro interno" });
  }
});

// 👇 NOVO: rota de recusa
router.post("/decline", async (req, res) => {
  try {
    let { name } = req.body;
    name = sanitize(name);

    if (!name || typeof name !== "string") return res.status(400).json({ error: "Nome inválido" });
    const cleanName = name.trim();
    if (cleanName.length < 2 || cleanName.length > 100) return res.status(400).json({ error: "Nome inválido" });

    const normalizedName = normalize(cleanName);

    const existingGuest = await GuestConfirmation.findOne({ normalizedName });
    if (existingGuest) {
      return res.status(400).json({ error: "Este nome já registrou uma resposta 💙" });
    }

    const newGuest = new GuestConfirmation({
      name: cleanName,
      normalizedName,
      guestsCount: 0,
      status: "declined",
    });

    await newGuest.save();

    try {
      await axios.post(GOOGLE_SHEETS_URL, {
        action: "decline",
        nome: cleanName,
        guestsCount: 0,
        data: new Date().toLocaleString("pt-BR"),
      });
    } catch (err) {
      console.error("❌ Erro Planilha:", err.message);
    }

    res.status(201).json({ message: "Registrado com sucesso 💙" });
  } catch (error) {
    console.error("ERRO DECLINE:", error);
    res.status(500).json({ error: "Erro interno" });
  }
});

export default router;