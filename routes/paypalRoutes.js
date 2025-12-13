const express = require("express");
const router = express.Router();
const paypal = require("@paypal/checkout-server-sdk");

// Configuração do ambiente PayPal
function environment() {
  if (process.env.PAYPAL_MODE === "live") {
    return new paypal.core.LiveEnvironment(
      process.env.PAYPAL_CLIENT_ID,
      process.env.PAYPAL_CLIENT_SECRET
    );
  } else {
    return new paypal.core.SandboxEnvironment(
      process.env.PAYPAL_CLIENT_ID,
      process.env.PAYPAL_CLIENT_SECRET
    );
  }
}

const client = new paypal.core.PayPalHttpClient(environment());

/**
 * Criar pagamento PayPal
 * POST /api/paypal/create
 */
router.post("/create", async (req, res) => {
  try {
    const { amount } = req.body;

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: amount
          }
        }
      ]
    });

    const order = await client.execute(request);
    res.json({ success: true, order });

  } catch (error) {
    console.error("Erro PayPal:", error);
    res.status(500).json({ success: false, message: "Erro ao criar pagamento PayPal" });
  }
});

/**
 * Capturar pagamento PayPal
 * POST /api/paypal/capture
 */
router.post("/capture", async (req, res) => {
  try {
    const { orderId } = req.body;

    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});

    const capture = await client.execute(request);
    res.json({ success: true, capture });

  } catch (error) {
    console.error("Erro ao capturar PayPal:", error);
    res.status(500).json({ success: false, message: "Erro ao capturar pagamento" });
  }
});

module.exports = router;
