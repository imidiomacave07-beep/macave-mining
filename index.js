const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   HEALTH CHECK
========================= */
app.get("/ping", (req, res) => {
  res.status(200).send("ok");
});

/* =========================
   ROUTES
========================= */
const depositRoutes = require("./routes/deposit.routes");
app.use("/deposit", depositRoutes);

/* =========================
   SERVER START
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
