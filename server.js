const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRoutes = require("./backend/auth.routes");
const plansRoutes = require("./backend/plans.routes");
const withdrawRoutes = require("./backend/withdraw.routes");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

app.use("/api/auth", authRoutes);
app.use("/api/plans", plansRoutes);
app.use("/api/withdraw", withdrawRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));
