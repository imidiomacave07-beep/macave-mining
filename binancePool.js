const axios = require("axios");
const crypto = require("crypto");

const API_KEY = process.env.BINANCE_API_KEY;
const SECRET = process.env.BINANCE_SECRET;

function sign(query) {
  return crypto.createHmac("sha256", SECRET).update(query).digest("hex");
}

async function getDailyMiningIncome() {
  const timestamp = Date.now();
  const query = `timestamp=${timestamp}`;
  const signature = sign(query);

  const res = await axios.get(
    `https://api.binance.com/sapi/v1/mining/payment/list?${query}&signature=${signature}`,
    {
      headers: { "X-MBX-APIKEY": API_KEY }
    }
  );

  return res.data.data.accountProfits || [];
}

module.exports = { getDailyMiningIncome };
