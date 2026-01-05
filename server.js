const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());

// SERVIR FRONTEND
app.use(express.static(path.join(__dirname, "public")));

// rota principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
