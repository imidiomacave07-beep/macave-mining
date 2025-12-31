const express = require("express");
const app = express();
const path = require("path");

// Serve arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, "public")));

// Rotas de API aqui
// Exemplo:
// app.use("/api/auth", require("./routes/authRoutes"));

// Rota fallback: redireciona tudo para index.html (opcional)
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "public", "index.html"));
// });

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
