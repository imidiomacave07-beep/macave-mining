let currentUser = 'demoUser';
let plansData = [];

async function loadPlans() {
  const res = await fetch('/api/plans');
  plansData = await res.json();
  showTab('Básico');
}

function showTab(planName) {
  const container = document.getElementById('plans-container');
  container.innerHTML = '';

  const plan = plansData.find(p => p.name === planName);
  if(!plan) return;

  const div = document.createElement('div');
  div.className = 'plan-card';
  div.innerHTML = `
    <h3>${plan.name}</h3>
    <p>Investimento: $${plan.min} – $${plan.max}</p>
    <p>Duração: ${plan.term} dias</p>
    <p>ROI diário: ${plan.dailyROI}%</p>
    <button onclick="buyPlan('${plan.name}')">Comprar este plano</button>
  `;
  container.appendChild(div);

  document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`.tab-button[onclick="showTab('${planName}')"]`).classList.add('active');
}

async function buyPlan(planName) {
  const amount = prompt('Quanto deseja investir?');
  if(!amount) return;

  const res = await fetch('/api/plans/buy', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: currentUser, planName, amount: Number(amount) })
  });
  const data = await res.json();
  alert(data.message);
  updateBalance();
}

async function updateBalance() {
  const res = await fetch(`/api/plans/balance/${currentUser}`);
  const data = await res.json();
  document.getElementById('user-balance').innerText = data.profit;
}

setInterval(updateBalance, 30000);

loadPlans();
updateBalance();
