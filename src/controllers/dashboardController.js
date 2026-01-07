exports.getDashboard = (req, res) => {
  res.json({
    saldo: 0,
    planosAtivos: [],
    status: "online"
  });
};
