const axios = require("axios");

// INSIRA SUAS CREDENCIAIS AQUI
const API_KEY = "SUA_API_KEY";
const API_SECRET = "SEU_API_SECRET";
const ORG_ID = "SEU_ORG_ID";
const BASE_URL = "https://api.nicehash.com";

// Obter saldo
async function getBalance() {
  const response = await axios.get(`${BASE_URL}/main/api/v2/accounting/balance`, {
    headers: {
      "X-API-KEY": API_KEY,
      "X-API-SECRET": API_SECRET,
      "X-Organization-ID": ORG_ID
    }
  });
  return response.data;
}

// Alocar hashrate
async function startMining(hashrate, algo = "SHA256") {
  console.log(`Alocando ${hashrate} TH/s para mineração ${algo}`);
}

module.exports = { getBalance, startMining };
