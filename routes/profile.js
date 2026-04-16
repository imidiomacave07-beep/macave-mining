const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/update-profile", async (req, res) => {
  try {

    const { userId, bio } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { bio },
      { new: true }
    );

    res.json({
      success: true,
      user
    });

  } catch (error) {

    res.status(500).json({
      error: "Erro ao atualizar perfil"
    });

  }
});

module.exports = router;
