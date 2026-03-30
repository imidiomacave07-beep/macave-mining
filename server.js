const express = require("express")
const app = express()
require("dotenv").config()
const mongoose = require("mongoose")

app.use(express.json())

mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1/macave", {
  useNewUrlParser:true,
  useUnifiedTopology:true
}).then(()=>console.log("MongoDB conectado"))
  .catch(err=>console.log("Erro MongoDB:", err))

// Middleware auth
const auth = require("./middleware/auth")

// Rotas
app.use("/api/auth", require("./routes/auth.routes"))
app.use("/api/user", require("./routes/user.routes"))
app.use("/api/wallet", require("./routes/wallet.routes"))
app.use("/api/plans", require("./routes/plans.routes"))

// Cron de mineração simulada
require("./cron/mining")

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>console.log("Macave Mining rodando na porta", PORT))
