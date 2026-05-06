function predictProfit(history) {
  const last7 = history.slice(-7);

  if (last7.length === 0) {
    return { daily: 0, weekly: 0, trend: 0 };
  }

  const avg =
    last7.reduce((sum, d) => sum + d.earnings, 0) / last7.length;

  const trend =
    (last7[last7.length - 1].earnings - last7[0].earnings) /
    last7.length;

  return {
    daily: avg,
    weekly: avg * 7,
    trend
  };
}

module.exports = { predictProfit };
