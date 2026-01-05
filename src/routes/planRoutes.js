const express = require("express");
const router = express.Router();
const planController = require("../controllers/planController");

// rotas públicas
router.get("/", planController.getPlans);
router.post("/", planController.createPlan); // futuramente pode proteger com authMiddleware

module.exports = router;
