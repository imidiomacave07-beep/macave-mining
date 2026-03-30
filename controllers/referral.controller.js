const referrals = {};

exports.registerReferral = (req, res) => {
  const { referrerId, newUserId } = req.body;
  if(!referrals[referrerId]) referrals[referrerId] = [];
  referrals[referrerId].push(newUserId);
  res.json({ message: 'Referral registrado!' });
};

exports.getReferrals = (req, res) => {
  const userId = req.params.userId;
  res.json({ referrals: referrals[userId] || [] });
};
