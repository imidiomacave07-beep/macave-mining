const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Usuário não encontrado" });
    }

    if (password !== user.password) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "macave_secret",
      { expiresIn: "1d" }
    );

    res.json({ token, user });
  } catch (err) {
    console.error("ERRO LOGIN:", err);
    res.status(500).json({ error: "Erro no servidor" });
  }
};
