require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Macave Mining API online 🚀");
});

app.listen(process.env.PORT, () => {
  console.log("Servidor rodando na porta", process.env.PORT);
});
