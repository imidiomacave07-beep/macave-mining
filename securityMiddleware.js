const crypto = require("crypto");

const SECRET = process.env.MINING_SECRET;

function verifyMiningSignature(req, res, next) {
  const { signature, userId, hashrate } = req.body;

  const payload = `${userId}:${hashrate}`;

  const expected = crypto
    .createHmac("sha256", SECRET)
    .update(payload)
    .digest("hex");

  if (signature !== expected) {
    return res.status(403).json({
      error: "Invalid mining signature"
    });
  }

  next();
}

module.exports = verifyMiningSignature;
