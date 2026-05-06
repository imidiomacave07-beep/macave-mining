function detectBot(user) {
  let score = 0;

  if (user.actionsPerMinute > 10) score += 40;
  if (user.multipleAccountsIP) score += 30;
  if (user.depositPattern === "too_regular") score += 20;

  return score > 60;
}

module.exports = { detectBot };
