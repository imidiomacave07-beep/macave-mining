const emailConfig = require("../config/email");

exports.getSupportInfo = (req, res) => {
  res.json({
    success: true,
    support: {
      supportEmail: emailConfig.supportEmail,
      financeEmail: emailConfig.financeEmail,
      adminEmail: emailConfig.adminEmail,
    },
  });
};
