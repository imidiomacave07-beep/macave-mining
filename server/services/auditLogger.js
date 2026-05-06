const AuditLog = require("../models/AuditLog");

async function logAudit(type, userId, amount, balanceAfter) {
  await AuditLog.create({
    type,
    userId,
    amount,
    balanceAfter
  });
}

module.exports = { logAudit };
