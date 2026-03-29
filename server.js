const express = require("express")
const app = express()
const path = require("path")

app.use(express.json())

// Serve arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, "public")))

// Rotas API
app.use("/api/users", require("./routes/users.routes"))
app.use("/api/plans", require("./routes/plans.routes"))
app.use("/api/wallet", require("./routes/wallet.routes"))

// Rota para qualquer outro caminho ir para index.html (single page)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"))
})

app.listen(5000, () => console.log("Macave Mining API running on port 5000"))
