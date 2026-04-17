const walletConfig = require("../config/wallet");

exports.getDepositWallets = (req, res) => {
  res.json({
    success: true,
    message: "Deposit wallets loaded successfully",
    wallets: {
      trc20: {
        network: walletConfig.networkTRC20,
        address: walletConfig.trc20Wallet,
      },
      erc20: {
        network: walletConfig.networkERC20,
        address: walletConfig.erc20Wallet,
      },
    },
  });
};
