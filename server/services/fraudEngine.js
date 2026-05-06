function calculateRisk(user) {
  let score = 0;

  if (user.failedLogins > 5) score += 30;
  if (user.multipleIPs) score += 25;
  if (user.withdrawImmediatelyAfterDeposit) score += 35;
  if (user.unusualAmountPattern) score += 20;

  return score;
}

module.exports = { calculateRisk };
