// public/js/dashboard.js
console.log("✅ dashboard.js carregado");

// Carteiras fixas
const DEPOSIT_WALLETS = {
  TRC20: "TXxxxxxxxxxxxxxxxx",
  BTC: "1Bxxxxxxxxxxxxxxxx",
  BEP20: "0xBEP20xxxxxxxxxxx",
  ERC20: "0xERC20xxxxxxxxxxx"
};

// Variáveis globais
let userId = null;
let balance = 0;
let activePlans = [];

// LOGIN
function login() {
  const input = document.getElementById("usernameInput");
  const username = input.value.trim();
  if (!username) return alert("Digite seu nome");

  userId = username.toLowerCase().replace(/\s+/g, "_");

  document.getElementById("loginPage").style.display = "none";
  document.getElementById("dashboardPage").style.display = "block";
  document.getElementById("usernameDisplay").textContent = username;

  loadPlans();
  updateBalanceDisplay();
  loadActivePlans();
}

// LOGOUT
function logout() {
  location.reload();
}

// ATUALIZA SALDO
function updateBalanceDisplay() {
  document.getElementById("balance").textContent = balance.toFixed(2);
}

// CARREGA PLANOS
async function loadPlans() {
  try {
    const res = await fetch("/api/plans");
    const plans = await res.json();
    const div = document.getElementById("plans");
    div.innerHTML = "";

    plans.forEach(p => {
      const el = document.createElement("div");
      el.className = "plan-card";
      el.innerHTML = `
        <h4>${p.name}</h4>
        <p>Preço: ${p.price} USD</p>
        <p>Lucro: ${p.daily}% / dia</p>
        <button onclick="buyPlan(${p.id}, ${p.price})">Comprar</button>
      `;
      div.appendChild(el);
    });
  } catch (e) {
    console.error(e);
    alert("Erro ao carregar planos");
  }
}

// COMPRAR PLANO – COM ESCOLHA DE CARTEIRA
async function buyPlan(planId, price) {
  if (!userId) return alert("Faça login primeiro");

  const method = prompt(
    "Escolha o método de depósito:\nTRC20\nBTC\nBEP20\nERC20"
  );

  if (!DEPOSIT_WALLETS[method]) return alert("Método inválido");

  alert(
    `Envie ${price}$ para:\n\n` +
    `${method}\n${DEPOSIT_WALLETS[method]}\n\n` +
    "Depois aguarde confirmação."
  );

  try {
    const res = await fetch("/api/plans/buy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        planId,
        method,
        status: "pending"
      })
    });

    const data = await res.json();

    if (!res.ok) return alert(data.error || "Erro ao comprar plano");

    // Adiciona ao frontend
    activePlans.push({
      ...data.plan,
      method,
      status: "pending",
      startDate: Date.now(),
      earned: 0
    });

    balance += data.plan.price;
    updateBalanceDisplay();
    loadActivePlans();

  } catch (err) {
    console.error(err);
    alert("Erro de conexão com o servidor");
  }
}

// CARREGA PLANOS ATIVOS
function loadActivePlans() {
  const el = document.getElementById("activePlans");
  el.innerHTML = "";

  if (activePlans.length === 0) {
    el.innerHTML = "<p>Nenhum plano comprado ainda.</p>";
    return;
  }

  activePlans.forEach(p => {
    el.innerHTML += `
      <div class="plan">
        <strong>${p.name}</strong><br>
        Lucro diário: ${p.daily}%<br>
        Total ganho: ${p.earned.toFixed(2)} $<br>
        Método: ${p.method}<br>
        Status: ${p.status}
      </div>
    `;
  });
}

// CALCULO AUTOMÁTICO DE LUCRO DIÁRIO
function calculateDailyEarnings() {
  const now = Date.now();
  let total = 0;

  activePlans.forEach(plan => {
    const daysPassed = Math.floor(
      (now - plan.startDate) / (1000 * 60 * 60 * 24)
    );

    if (daysPassed <= plan.days) {
      const dailyProfit = (plan.price * plan.daily) / 100;
      plan.earned = dailyProfit * daysPassed;
      total += plan.earned;
    }
  });

  balance = total;
  updateBalanceDisplay();
  loadActivePlans();
}

// ATUALIZA AUTOMATICAMENTE A CADA MINUTO
setInterval(calculateDailyEarnings, 60000);
calculateDailyEarnings();
