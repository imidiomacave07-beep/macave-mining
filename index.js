const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* =========================
   MIDDLEWARE
========================= */
app.use(cors());
app.use(express.json());

// Servir ficheiros da pasta public
app.use(express.static("public"));

/* =========================
   HEALTH CHECK (PING)
========================= */
app.get("/ping", (req, res) => {
  res.status(200).send("ok");
});

/* =========================
   HOME ROUTE
========================= */
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

/* =========================
   ROUTES IMPORT
========================= */

// Deposit Routes
const depositRoutes = require("./routes/deposit.js");
app.use("/deposit", depositRoutes);

// Contact / Support Routes
const contactRoutes = require("./routes/contact.routes");
app.use("/contact", contactRoutes);

/* =========================
   SERVER START
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
