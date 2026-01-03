const express = require("express");
const path = require("path");

const app = express();

// 🔴 SEM ISTO O LOGIN NUNCA FUNCIONA
app.use(express.json());

// rotas
const authRoutes = require("./src/routes/authRoutes");
app.use("/api/auth", authRoutes);

// ficheiros públicos
app.use(express.static(path.join(__dirname, "public")));

// dashboard
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});
