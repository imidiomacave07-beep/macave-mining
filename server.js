const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb+srv://macave-mining-1:Macave1234@cluster0.fqqvnqa.mongodb.net/macaveMining");

function validateWallet(address, type) {
  switch (type) {
    case "TRC20": return /^T[a-zA-Z0-9]{33}$/.test(address);
    case "BTC": return /^(1|3|bc1)[a-zA-Z0-9]{25,39}$/.test(address);
    case "BEP20":
    case "ERC20": return /^0x[a-fA-F0-9]{40}$/.test(address);
    default: return false;
  }
}

/* LOGIN */
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) return res.status(400).json({ error: "Login inválido" });

  res.json(user);
});

/* SAQUE USUÁRIO */
app.post("/api/withdraw/request", async (req, res) => {
  const { userId, amount, method, destination } = req.body;

  if (!validateWallet(destination, method))
    return res.status(400).json({ error: "Carteira inválida" });

  const user = await User.findById(userId);
  if (amount > user.balance)
    return res.status(400).json({ error: "Saldo insuficiente" });

  user.balance -= amount;
  user.withdraws.push({
    amount,
    method,
    destination,
    date: new Date().toLocaleString(),
    status: "pendente"
  });

  await user.save();
  res.json({ balance: user.balance });
});

/* ADMIN – LISTAR SAQUES */
app.get("/api/admin/withdraws", async (req, res) => {
  const users = await User.find();
  const withdraws = [];

  users.forEach(u => {
    u.withdraws.forEach((w, i) => {
      if (w.status === "pendente") {
        withdraws.push({
          userId: u._id,
          index: i,
          email: u.email,
          ...w
        });
      }
    });
  });

  res.json(withdraws);
});

/* ADMIN – APROVAR / REJEITAR */
app.post("/api/admin/withdraw/action", async (req, res) => {
  const { userId, index, action } = req.body;

  const user = await User.findById(userId);
  user.withdraws[index].status = action;
  await user.save();

  res.json({ message: "Atualizado" });
});

app.listen(3000, () => console.log("🚀 Macave Mining API rodando"));
