const User = require("../models/User");

router.post("/", async (req, res) => {
  try {
    const { userId, amount } = req.body;

    // 💰 UPDATE ATÓMICO (SEGURANÇA REAL)
    const user = await User.findOneAndUpdate(
      {
        _id: userId,
        balance: { $gte: amount } // só permite se tiver saldo
      },
      {
        $inc: { balance: -amount } // subtrai direto no DB
      },
      {
        new: true
      }
    );

    if (!user) {
      return res.status(400).json({
        error: "Saldo insuficiente ou operação inválida"
      });
    }

    res.json({
      success: true,
      balance: user.balance
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
