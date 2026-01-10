const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const authRoutes = require("./backend/auth");
const plansRoutes = require("./backend/plans");
const withdrawRoutes = require("./backend/withdraw");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URI)
  .then(()=>console.log("✅ MongoDB conectado"))
  .catch(err=>console.log("❌ Erro MongoDB:",err));

app.use("/api/auth", authRoutes);
app.use("/api/plans", plansRoutes);
app.use("/api/withdraw", withdrawRoutes);

app.listen(process.env.PORT, ()=>console.log(`🚀 Macave Mining API rodando na porta ${process.env.PORT}`));
