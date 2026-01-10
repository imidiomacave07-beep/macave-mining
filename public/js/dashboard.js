console.log("✅ dashboard.js carregado");

let userId = null;
let balance = 0;
let activePlans = [];
let activeWithdraws = [];

function login() {
  console.log("🔐 login() clicado");

  const input = document.getElementById("usernameInput");
  if (!input) {
    alert("Campo de login não encontrado");
    return;
  }

  const username = input.value.trim();
  if (!username) {
    alert("Digite seu nome");
    return;
  }

  userId = username.toLowerCase().replace(/\s+/g, "_");

  document.getElementById("loginPage").style.display = "none";
  document.getElementById("dashboardPage").style.display = "block";
  document.getElementById("usernameDisplay").textContent = username;

  loadPlans();
  updateBalance();
}

function logout() {
  location.reload();
}

function updateBalance() {
  document.getElementById("balance").textContent = balance.toFixed(2);
}

async function loadPlans() {
  console.log("📦 carregando planos...");
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
        <p>Lucro: ${p.dailyMin}% – ${p.dailyMax}% / dia</p>
        <button onclick="buyPlan('${p.id}')">Comprar</button>
      `;
      div.appendChild(el);
    });

  } catch (e) {
    console.error(e);
    alert("Erro ao carregar planos");
  }
}

function buyPlan(id) {
  alert("Plano comprado (simulado): " + id);
  balance += 10;
  updateBalance();
}
