const API_URL = "https://macave-mining.onrender.com/api";
let token = null;
let userId = null;
let isAdmin = false;
let balance = 0;
let activePlans = [];
let withdraws = [];

// ---------------- Mensagens ----------------
function showMessage(text, isError=false) {
  const msg = document.getElementById("message");
  msg.textContent = text;
  msg.className = isError ? "error" : "message";
}
function showDashMessage(text, isError=false) {
  const msg = document.getElementById("dashMessage");
  msg.textContent = text;
  msg.className = isError ? "error" : "message";
}
function updateBalanceDisplay() { document.getElementById("balance").textContent = balance.toFixed(2); }
function updateWithdrawHistory() {
  const histDiv = document.getElementById("withdrawHistory");
  if(withdraws.length===0) histDiv.textContent="Nenhum saque ainda.";
  else histDiv.innerHTML = withdraws.map(w=>`${w.amount} 💎 - ${w.date} (${w.method} - ${w.destination})`).join("<br>");
}

// ---------------- Registro ----------------
async function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({email,password})
    });
    const data = await res.json();
    if(res.ok) showMessage(data.message);
    else showMessage(data.error,true);
  } catch(err){ showMessage("Erro de conexão",true); }
}

// ---------------- Login ----------------
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({email,password})
    });
    const data = await res.json();
    if(res.ok) {
      token = data.token;
      userId = data.token;
      isAdmin = data.isAdmin;
      balance = data.balance;
      activePlans = data.plans || [];
      withdraws = data.withdraws || [];

      document.getElementById("auth").style.display="none";
      if(isAdmin) {
        document.getElementById("adminPanel").style.display="block";
        loadAdminUsers();
      } else {
        document.getElementById("dashboard").style.display="block";
        renderPlans(); renderActivePlans(); updateBalanceDisplay(); updateWithdrawHistory();
        startProfitSimulation();
      }
    } else { showMessage(data.error,true); }
  } catch(err){ showMessage("Erro de conexão",true); }
}

// ---------------- Logout ----------------
function logout() {
  token = null; userId=null; activePlans=[]; withdraws=[]; balance=0;
  document.getElementById("auth").style.display="block";
  document.getElementById("dashboard").style.display="none";
  document.getElementById("adminPanel").style.display="none";
  showMessage(""); showDashMessage("");
}

// ---------------- Planos ----------------
const plans=[
  {id:1,name:"Bronze",price:10,profit:1},
  {id:2,name:"Prata",price:50,profit:6},
  {id:3,name:"Ouro",price:100,profit:15},
];
function renderPlans() {
  const plansDiv=document.getElementById("plans"); plansDiv.innerHTML="";
  plans.forEach(plan=>{
    const div=document.createElement("div"); div.className="plan";
    div.innerHTML=`<strong>${plan.name}</strong><br>Preço: $${plan.price} 💎<br>Lucro: $${plan.profit} 💎 / 5s<br>
    <button onclick="buyPlan(${plan.id})">Comprar</button>`;
    plansDiv.appendChild(div);
  });
}

// ---------------- Comprar Plano ----------------
async function buyPlan(planId) {
  const plan = plans.find(p=>p.id===planId);
  if(!plan) return;
  if(balance < plan.price) return showDashMessage("Saldo insuficiente", true);

  try {
    const res = await fetch(`${API_URL}/plans/buy`, {
      method:"POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({userId, planId:plan.id, name:plan.name, price:plan.price, profit:plan.profit})
    });
    const data = await res.json();
    if(res.ok) {
      activePlans.push(data.plan);
      balance = data.balance;
      updateBalanceDisplay();
      renderActivePlans();
      showDashMessage(`Você comprou o plano ${plan.name}! Endereço da carteira: ${data.plan.wallet}`);
    } else showDashMessage(data.error,true);
  } catch(err){ showDashMessage("Erro de conexão",true); }
}

// ---------------- Renderiza Planos Ativos ----------------
function renderActivePlans() {
  const activeDiv=document.getElementById("activePlans");
  if(activePlans.length===0) { activeDiv.textContent="Nenhum plano comprado ainda."; return; }
  activeDiv.innerHTML="";
  activePlans.forEach(p=>{
    const div=document.createElement("div"); div.className="active-plan";
    div.innerHTML=`<strong>${p.name}</strong> - Lucro/5s: ${p.profit} 💎<br>
    <span class="wallet">Carteira: ${p.wallet}</span>`;
    activeDiv.appendChild(div);
  });
}

// ---------------- Saque ----------------
async function requestWithdraw() {
  const amount = parseFloat(document.getElementById("withdrawAmount").value);
  const walletType = document.getElementById("walletType").value;
  const walletAddress = document.getElementById("walletAddress").value;

  if(!walletAddress || walletAddress.length < 10)
    return showDashMessage("Endereço de carteira inválido", true);

  if(!amount || amount <= 0)
    return showDashMessage("Valor inválido", true);

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

    if(res.ok) {
      balance = data.balance;
      withdraws.push({
        amount,
        date: new Date().toLocaleString(),
        method: walletType,
        destination: walletAddress
      });
      updateBalanceDisplay();
      updateWithdrawHistory();
      showDashMessage("Saque solicitado com sucesso!");
    } else {
      showDashMessage(data.error, true);
    }
  } catch {
    showDashMessage("Erro de conexão", true);
  }
}

// ---------------- Lucro Automático ----------------
function startProfitSimulation() {
  setInterval(()=>{
    let totalProfit = 0;
    activePlans.forEach(p => { totalProfit += p.profit; });
    balance += totalProfit;
    updateBalanceDisplay();
  }, 5000);
}

// ---------------- Painel Admin ----------------
async function loadAdminUsers() {
  try {
    const res = await fetch(`${API_URL}/admin/users`, { headers: {"Authorization": token} });
    const data = await res.json();
    const usersDiv = document.getElementById("usersList"); usersDiv.innerHTML="";
    if(!res.ok) usersDiv.textContent="Erro ao carregar usuários";
    else {
      data.users.forEach(u=>{
        const div = document.createElement("div"); div.className="user-card";
        div.innerHTML=`<strong>${u.email}</strong><br>Saldo: ${u.balance} 💎<br>
        Carteira: ${u.wallet}<br>
        Planos: ${u.plans.map(p=>p.name).join(", ")}<br>
        Saques: ${u.withdraws.map(w=>w.amount+" 💎 ("+w.method+"-"+w.destination+")").join(", ")}`;
        usersDiv.appendChild(div);
      });
    }
  } catch(err){ document.getElementById("usersList").textContent="Erro de conexão"; }
}
