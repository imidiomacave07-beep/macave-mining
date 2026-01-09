const API_URL = "https://macave-mining.onrender.com/api"; // Ajuste se necessário

// Simula usuário logado (substituir pelo login real depois)
const userId = "123456"; 
let balance = 0;
let activePlans = [];

// Função para mostrar planos disponíveis
async function loadPlans() {
  try {
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
  } catch (err) {
    console.error("Erro ao carregar planos:", err);
  }
}

// Função para comprar plano
async function buyPlan(planId) {
  try {
    const res = await fetch(`${API_URL}/plans/buy`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, planId })
    });

    const data = await res.json();

    if (data.success) {
      activePlans.push(data.plan);
      balance += data.plan.price; // ou outro cálculo de saldo
      updateBalanceDisplay();
      updateActivePlans();
      alert(data.message);
    } else {
      alert(data.error || "Erro ao comprar plano");
    }
  } catch (err) {
    console.error("Erro na compra:", err);
    alert("Erro de conexão");
  }
}

// Atualiza o saldo do usuário no dashboard
function updateBalanceDisplay() {
  const balanceEl = document.getElementById("balance");
  balanceEl.textContent = balance.toFixed(2);
}

// Atualiza a lista de planos ativos
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

// Inicializa dashboard
function initDashboard() {
  loadPlans();
  updateBalanceDisplay();
  updateActivePlans();
}

document.addEventListener("DOMContentLoaded", initDashboard);
