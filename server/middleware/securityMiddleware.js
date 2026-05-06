const ALLOWED_SOURCES = [
  "trusted-mining-api.com",
  "pool.api.provider"
];

function validateSource(req, res, next) {
  const origin = req.headers["x-source"];

  if (!ALLOWED_SOURCES.includes(origin)) {
    return res.status(403).json({ error: "Fonte inválida" });
  }

  next();
}

module.exports = validateSource;
