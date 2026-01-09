// FUNÇÃO PARA SOLICITAR SAQUE
async function requestWithdraw() {
  const amount = parseFloat(document.getElementById("withdrawAmount").value);
  const walletType = document.getElementById("walletType").value;
  const walletAddress = document.getElementById("walletAddress").value;

  if (!walletAddress || walletAddress.length < 10) {
    alert("Endereço de carteira inválido");
    return;
  }
  if (!amount || amount <= 0) {
    alert("Valor inválido");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/withdraw/request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        amount,
        method: walletType,
        destination: walletAddress
      })
    });
    const data = await res.json();

    if (res.ok) {
      balance = data.balance;
      alert("Saque solicitado com sucesso!");
      updateBalanceDisplay();
    } else {
      alert(data.error || "Erro ao solicitar saque");
    }
  } catch (err) {
    console.error(err);
    alert("Erro de conexão");
  }
}
