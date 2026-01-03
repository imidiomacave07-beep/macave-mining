const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());

// Rotas
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Servir ficheiros públicos
app.use(express.static(path.join(__dirname, "../public")));

// Dashboard
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/dashboard.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor a correr na porta ${PORT}`));
