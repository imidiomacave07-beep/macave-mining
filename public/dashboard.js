// Atualiza histórico de saques
function updateWithdrawHistory() {
  const container = document.getElementById("withdrawHistory");
  if (!activeWithdraws || activeWithdraws.length === 0) {
    container.textContent = "Nenhum saque ainda.";
    return;
  }

  container.innerHTML = "";
  activeWithdraws.forEach(w => {
    const div = document.createElement("div");
    div.className = "plan-card";
    div.innerHTML = `
      <p><strong>Valor:</strong> ${w.amount} USD</p>
      <p><strong>Tipo:</strong> ${w.method}</p>
      <p><strong>Endereço:</strong> ${w.destination}</p>
      <p><strong>Data:</strong> ${w.date}</p>
    `;
    container.appendChild(div);
  });
}

// Inicializa histórico de saques
let activeWithdraws = [];
