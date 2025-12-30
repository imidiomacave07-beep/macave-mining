const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* MIDDLEWARES */
app.use(cors());
app.use(express.json());

/* 👉 SERVIR ARQUIVOS PÚBLICOS */
app.use(express.static("public"));

/* TESTE */
app.get("/", (req, res) => {
  res.send("Macave Mining API está rodando 🚀");
});
