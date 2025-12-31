const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Dados em falta" });
    }

    const hashed = await bcrypt.hash(password, 10);

    return res.status(201).json({
      message: "Utilizador registado com sucesso",
      user: { name, email }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro no servidor" });
  }
};
