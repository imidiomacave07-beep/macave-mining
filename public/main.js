async function loadPlans() {
  const res = await fetch('/api/plans');
  const plans = await res.json();
  const container = document.getElementById('plans-container');
  container.innerHTML = '';

  plans.forEach(plan => {
    container.innerHTML += `
      <div class="plan-card">
        <h2>${plan.nome}</h2>
        <p>Daily ROI: ${plan.dailyROI}%</p>
        <p>Term: ${plan.term} dias</p>
        <p>Min Deposit: $${plan.minDeposit}</p>
        <p>Max Deposit: $${plan.maxDeposit}</p>
        <button onclick="buyPlan(${plan.id})">Invest Now</button>
      </div>
    `;
  });
}

async function buyPlan(planId) {
  const amount = parseFloat(prompt('Quanto deseja investir?'));
  const token = prompt('Cole seu token JWT:');

  const res = await fetch('/api/wallet/buy-plan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
    body: JSON.stringify({ planId, amount })
  });
  const data = await res.json();
  alert(data.message || JSON.stringify(data));
}

loadPlans();
