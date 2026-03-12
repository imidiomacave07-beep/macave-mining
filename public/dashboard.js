let currentTab = 'login';

function showTab(tab) {
  document.querySelectorAll('.tab').forEach(div => div.style.display = 'none');
  document.getElementById(tab).style.display = 'block';
  currentTab = tab;

  if(tab === 'mining') loadPlans();
}

async function loadPlans() {
  const res = await fetch("/api/plans");
  const plans = await res.json();

  const container = document.getElementById("plans");
  container.innerHTML = '';
  plans.forEach(plan => {
    const daily = (plan.price * plan.dailyPercent / 100).toFixed(2);
    const total = (daily * plan.days).toFixed(2);
    container.innerHTML += `
      <div class="plan">
        <h4>${plan.name}</h4>
        <p>Preço: ${plan.price} USD</p>
        <p>Lucro diário: ${daily} USD</p>
        <p>Duração: ${plan.days} dias</p>
        <p>Retorno total: ${total} USD</p>
        <button onclick="buyPlan('${plan.name}')">Comprar</button>
      </div>
    `;
  });
}

function buyPlan(planName) {
  alert(`Plano ${planName} comprado!`);
  // Aqui você chamaria API para registrar compra real
}

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  alert(data.message || data.error);
}

async function register() {
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-password").value;
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  alert(data.message || data.error);
    }
