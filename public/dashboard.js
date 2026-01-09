const API_URL = "https://macave-mining.onrender.com/api";

let userId = null;
let username = "";
let balance = 0;
let activePlans = [];
let activeWithdraws = [];

// LOGIN SIMULADO
function login() {
  username = document.getElementById("usernameInput").value.trim();
  if (!username) { alert("Digite seu nome"); return; }
  userId = username.toLowerCase().replace(/\s/g, "_"); // id único simples
  document.getElementById("usernameDisplay").textContent = username;
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("dashboardPage").style.display = "block";

  // Inicializa dados do usuário
  fetchPlans();
  updateBalanceDisplay();
  updateActivePlans();
  updateWithdrawHistory();
}

// LOGOUT
function logout() {
  location.reload();
}

// CARREGAR PLANOS
async function fetchPlans() {
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

// COMPRAR PLANO
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

// SAQUE
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

// BALANCE
function updateBalanceDisplay() {
  document.getElementById("balance").textContent = balance.toFixed(2);
}

// PLANOS ATIVOS
function updateActivePlans() {
  const container = document.getElementById("activePlans");
  if (activePlans.length === 0) { container.textContent = "Nenhum plano comprado ainda."; return; }
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

// HISTÓRICO DE SAQUES
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

// LUCRO DIÁRIO SIMULADO
function calcularLucroDiario() {
  activePlans.forEach(plan => {
    const ganho = plan.price * (Math.random() * (plan.dailyMax - plan.dailyMin) + plan.dailyMin) / 100;
    balance += ganho;
  });
  updateBalanceDisplay();
}

// Simula lucro diário a cada 10s (teste rápido)
setInterval(calcularLucroDiario, 10000);
