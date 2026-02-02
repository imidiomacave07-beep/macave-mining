import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;
const dbPath = path.resolve("./database/db.json");

app.get("/healthz", (req, res) => res.send("OK"));

app.get("/data", (req, res) => {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({ users: [] }, null, 2));
  }
  res.json(JSON.parse(fs.readFileSync(dbPath)));
});

app.listen(PORT, () => {
  console.log("Servidor online na porta", PORT);
});
