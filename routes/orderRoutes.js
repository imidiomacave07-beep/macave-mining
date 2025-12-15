const express = require("express");
const router = express.Router();

const Order = require("../models/Order");
const Service = require("../models/Service");
const User = require("../models/User");

// Criar pedido (compra)
router.post("/create", async (req, res) => {
  try {
    const { serviceId, buyerId } = req.body;

    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Serviço não encontrado" });
    }

    const buyer = await User.findById(buyerId);
    const seller = await User.findById(service.seller);

    const amount = service.price;
    const commission = amount * 0.2;
    const sellerAmount = amount - commission;

    // Criar pedido
    const order = new Order({
      service: service._id,
      buyer: buyer._id,
      seller: seller._id,
      amount,
      commission,
      status: "completed"
    });

    await order.save();

    // Atualizar saldo do vendedor
    seller.balance += sellerAmount;
    await seller.save();

    res.status(201).json({
      message: "Compra realizada com sucesso",
      order
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro na compra" });
  }
});

module.exports = router;
