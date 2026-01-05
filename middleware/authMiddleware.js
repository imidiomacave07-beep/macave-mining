const User = require("../models/User");

module.exports = async (req, res, next) => {
  const user = await User.findById(req.userId);

  if (!user || user.role !== "admin") {
    return res.status(403).json({ message: "Acesso apenas para admin" });
  }

  next();
};
