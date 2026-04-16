const express = require("express");
const router = express.Router();
const Deposit = require("../models/Deposit");

// CRIAR DEPÓSITO
router.post("/", async (req, res) => {
  try {
    const { userId, amount, network } = req.body;

    const deposit = new Deposit({
      userId,
      amount,
      network
    });

    await deposit.save();

    res.json({
      success: true,
      message: "Depósito criado com sucesso (pendente)"
    });

  } catch (err) {
    res.status(500).json({ error: "Erro ao criar depósito" });
  }
});

// LISTAR DEPÓSITOS DO USUÁRIO
router.get("/:userId", async (req, res) => {
  const data = await Deposit.find({ userId: req.params.userId });
  res.json(data);
});

module.exports = router;
