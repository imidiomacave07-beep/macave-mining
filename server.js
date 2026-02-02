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

const PORT = process.env.PORT || 10000;
const dbPath = path.resolve("./database/db.json");

app.get("/healthz", (req, res) => res.send("OK"));

app.get("/data", (req, res) => {
  try {
    if (!fs.existsSync(dbPath)) {
      fs.writeFileSync(
        dbPath,
        JSON.stringify({ usuarios: [], planos: [] }, null, 2)
      );
    }
    const data = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Erro ao ler db.json" });
  }
});

app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
