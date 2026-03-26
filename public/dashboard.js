function showSection(section) {
  const sections = ['mining','deposit','withdraw','contact'];
  sections.forEach(sec => {
    document.getElementById(sec).style.display = sec === section ? 'block' : 'none';
  });
}

// Pegar planos do backend
fetch('/api/plans')
  .then(res => res.json())
  .then(plans => {
    const container = document.getElementById('plans');
    plans.forEach(plan => {
      const div = document.createElement('div');
      div.innerHTML = `
        <h3>${plan.name}</h3>
        <p>Preço: $${plan.price}</p>
        <p>Lucro: ${plan.profit} / dia</p>
        <button onclick="buyPlan('${plan.name}')">Comprar</button>
      `;
      container.appendChild(div);
    });
  });

function buyPlan(planName) {
  fetch('/api/plans/buy', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ planName })
  })
  .then(res => res.json())
  .then(data => alert(data.message))
  .catch(err => alert('Erro ao comprar plano'));
    }
