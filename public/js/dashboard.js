const API_URL = "";
let userId = null;
let balance = 0;
let plans = [];
let withdraws = [];
let isAdmin = false;

const plansData = [
  { id: 1, name: "Plano Básico", price: 20, profit: 5 },
  { id: 2, name: "Plano Médio", price: 50, profit: 15 },
  { id: 3, name: "Plano Premium", price: 100, profit: 35 }
];

function showMessage(id, msg, error=false) {
  const el = document.getElementById(id);
  el.textContent = msg;
  el.style.color = error ? "red" : "green";
}

// AUTH
async function register() {
  const email = email.value;
  const password = password.value;

  const res = await fetch("/api/auth/register", {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  showMessage("authMsg", data.message || data.error, !res.ok);
}

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/api/auth/login", {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  if(!res.ok) return showMessage("authMsg", data.error, true);

  userId = data.token;
  balance = data.balance;
  plans = data.plans;
  withdraws = data.withdraws;
  isAdmin = data.isAdmin;

  document.getElementById("authBox").classList.add("hidden");

  if(isAdmin) {
    document.getElementById("adminPanel").classList.remove("hidden");
    loadAdmin();
  } else {
    document.getElementById("dashboard").classList.remove("hidden");
    renderDashboard();
  }
}

// DASHBOARD
function renderDashboard() {
  document.getElementById("balance").textContent = balance;

  const plansDiv = document.getElementById("plans");
  plansDiv.innerHTML = "";
  plansData.forEach(p => {
    plansDiv.innerHTML += `
      <div class="plan">
        <b>${p.name}</b><br>
        Preço: ${p.price}<br>
        Lucro diário: ${p.profit}
        <button onclick="buyPlan(${p.id})">Comprar</button>
      </div>
    `;
  });

  const active = document.getElementById("activePlans");
  active.innerHTML = plans.length
    ? plans.map(p=>`<div class="active-plan">${p.name}</div>`).join("")
    : "Nenhum plano comprado ainda.";

  renderWithdraws();
}

async function buyPlan(id) {
  const p = plansData.find(x=>x.id===id);
  const res = await fetch("/api/plans/buy", {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({ userId, ...p })
  });
  const data = await res.json();
  if(!res.ok) return alert(data.error);

  balance = data.balance;
  plans.push(data.plan);
  renderDashboard();
}

// SAQUE
async function requestWithdraw() {
  const amount = Number(withdrawAmount.value);
  const walletType = walletType.value;
  const walletAddress = walletAddress.value;

  const res = await fetch("/api/withdraw/request", {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({
      userId,
      amount,
      method: walletType,
      destination: walletAddress
    })
  });

  const data = await res.json();
  if(!res.ok) return alert(data.error);

  balance = data.balance;
  withdraws.push({
    amount,
    method: walletType,
    destination: walletAddress,
    date: new Date().toLocaleString()
  });

  renderDashboard();
}

function renderWithdraws() {
  const div = document.getElementById("withdrawHistory");
  div.innerHTML = withdraws.length
    ? withdraws.map(w=>`
        <div class="withdraw">
          ${w.amount} | ${w.method}<br>
          ${w.destination}<br>
          ${w.date}
        </div>
      `).join("")
    : "Nenhum saque ainda.";
}

// ADMIN
async function loadAdmin() {
  const res = await fetch("/api/admin/users", {
    headers:{ Authorization:userId }
  });
  const data = await res.json();

  document.getElementById("adminUsers").innerHTML =
    data.users.map(u=>`
      <div class="plan">
        <b>${u.email}</b><br>
        Saldo: ${u.balance}<br>
        Carteira: ${u.wallet}
      </div>
    `).join("");
}

// LOGOUT
function logout() {
  location.reload();
}
