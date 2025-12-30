const User = require("../models/User");
const bcrypt = require("bcryptjs");

/* =========================
   REGISTER
========================= */
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Preencha todos os campos" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Usuário já existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      balance: 0
    });

    await user.save();

    res.status(201).json({ message: "Usuário registrado com sucesso" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* =========================
   LOGIN
========================= */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Preencha todos os campos" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Senha incorreta" });
    }

    res.json({
      message: "Login realizado com sucesso",
      userId: user._id,
      username: user.username,
      balance: user.balance
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
