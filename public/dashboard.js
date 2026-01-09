const API_URL = "https://macave-mining.onrender.com/api";

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
  alert(data.message || "Erro");
}

loadPlans();
