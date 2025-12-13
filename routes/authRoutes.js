const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed
    });

    return res.json({ success: true, msg: "Conta criada com sucesso!" });

  } catch (err) {
    return res.status(500).json({ 
      success: false, 
      msg: "Erro interno." 
    });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.json({ success: false, msg: "Usuário não encontrado" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.json({ success: false, msg: "Senha incorreta" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    return res.json({ success: true, token });

  } catch (err) {
    return res.status(500).json({ success: false, msg: "Erro interno." });
  }
});

module.exports = router;
