const API_URL = "https://macave-mining.onrender.com/api";
const userId = "123456";
let balance = 0;
let activePlans = [];
let activeWithdraws = [];

async function loadPlans() {
  const res = await fetch(`${API_URL}/plans`);
  const plans = await res.json();
  const container = document.getElementById("plans");
  container.innerHTML = "";
  plans.forEach(plan => {
    const div = document.createElement("div");
    div.className = "plan-card";
    div.innerHTML = `
      <h3>${plan.name}</h3>
      <p>Preço: ${plan.price} USD</p>
      <p>Rendimento: ${plan.dailyMin}% - ${plan.dailyMax}% / dia</p>
      <button onclick="buyPlan('${plan.id}')">Comprar</button>
    `;
    container.appendChild(div);
  });
}

async function buyPlan(planId) {
  const res = await fetch(`${API_URL}/plans/buy`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, planId })
  });
  const data = await res.json();
  if (data.success) {
    activePlans.push(data.plan);
    balance += data.plan.price;
    updateBalanceDisplay();
    updateActivePlans();
    alert(data.message);
  } else {
    alert(data.error || "Erro ao comprar plano");
  }
}

function updateBalanceDisplay() {
  document.getElementById("balance").textContent = balance.toFixed(2);
}

function updateActivePlans() {
  const container = document.getElementById("activePlans");
  if (activePlans.length === 0) {
    container.textContent = "Nenhum plano comprado ainda.";
    return;
  }
  container.innerHTML = "";
  activePlans.forEach(plan => {
    const div = document.createElement("div");
    div.className = "plan-card";
    div.innerHTML = `
      <h3>${plan.name} (Ativo)</h3>
      <p>Preço: ${plan.price} USD</p>
      <p>Rendimento: ${plan.dailyMin}% - ${plan.dailyMax}% / dia</p>
    `;
    container.appendChild(div);
  });
}

async function requestWithdraw() {
  const amount = parseFloat(document.getElementById("withdrawAmount").value);
  const walletType = document.getElementById("walletType").value;
  const walletAddress = document.getElementById("walletAddress").value;
  if (!walletAddress || walletAddress.length < 10) { alert("Endereço inválido"); return; }
  if (!amount || amount <= 0) { alert("Valor inválido"); return; }

  try {
    const res = await fetch(`${API_URL}/withdraw/request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, amount, method: walletType, destination: walletAddress })
    });
    const data = await res.json();
    if (res.ok) {
      balance = data.balance;
      activeWithdraws = data.withdraws;
      updateBalanceDisplay();
      updateWithdrawHistory();
      alert("Saque solicitado com sucesso!");
    } else {
      alert(data.error || "Erro ao solicitar saque");
    }
  } catch {
    alert("Erro de conexão");
  }
}

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

function initDashboard() {
  loadPlans();
  updateBalanceDisplay();
  updateActivePlans();
  updateWithdrawHistory();
}

document.addEventListener("DOMContentLoaded", initDashboard);
