const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function getUsers() {
  if (!client.topology?.isConnected()) await client.connect();
  return client.db("macave").collection("users");
}

async function register(req, res) {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Dados inválidos" });

  const users = await getUsers();
  const exists = await users.findOne({ email });
  if (exists)
    return res.status(400).json({ error: "Usuário já existe" });

  const hash = await bcrypt.hash(password, 10);
  await users.insertOne({ email, password: hash, balance: 0 });

  res.json({ message: "Registrado com sucesso" });
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Dados inválidos" });

  const users = await getUsers();
  const user = await users.findOne({ email });
  if (!user)
    return res.status(401).json({ error: "Usuário não encontrado" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok)
    return res.status(401).json({ error: "Senha incorreta" });

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token });
}

module.exports = { register, login };
