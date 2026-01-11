const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000;

/* =========================
   DADOS EM MEMÓRIA (TESTE)
========================= */
const users = [];

/* =========================
   MIDDLEWARES
========================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

/* =========================
   ROTAS PRINCIPAIS
========================= */
app.get("/", (req, res) => {
  res.send("🚀 Macave Mining API está ativa");
});

/* =========================
   REGISTER
========================= */
app.post("/api/register", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Preencha todos os campos" });
  }

  const exists = users.find(u => u.email === email);
  if (exists) {
    return res.status(400).json({ error: "Usuário já existe" });
  }

  users.push({ email, password });

  res.json({ success: true, message: "Registro feito com sucesso" });
});

/* =========================
   LOGIN
========================= */
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  res.json({ success: true });
});

/* =========================
   PLANOS
========================= */
app.get("/api/plans", (req, res) => {
  res.json([
    { id: 1, name: "Starter", price: 20, daily: "0.6%" },
    { id: 2, name: "Basic", price: 50, daily: "0.8%" },
    { id: 3, name: "Pro", price: 100, daily: "1%" },
    { id: 4, name: "Advanced", price: 200, daily: "1.2%" }
  ]);
});

/* =========================
   DASHBOARD
========================= */
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

/* =========================
   START
========================= */
app.listen(PORT, () => {
  console.log(`🚀 Macave Mining API rodando na porta ${PORT}`);
});
