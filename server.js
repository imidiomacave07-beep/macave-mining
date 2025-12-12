const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/connect");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Rotas
app.use("/auth", require("./routes/authRoutes"));
app.use("/paypal", require("./routes/paypalRoutes"));
app.use("/crypto", require("./routes/cryptoRoutes"));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
