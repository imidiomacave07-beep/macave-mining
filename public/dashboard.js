async function loadPlans() {
  const res = await fetch("/api/plans");
  const plans = await res.json();

  const container = document.getElementById("plans");
  container.innerHTML = "";

  plans.forEach(p => {
    container.innerHTML += `
      <div class="plan-card">
        <h3>${p.name}</h3>
        <p>Preço: <b>${p.price} USD</b></p>
        <p>Lucro: ${p.minDaily}% – ${p.maxDaily}% / dia</p>
        <p>Duração: ${p.duration} dias</p>
        <button onclick="buyPlan('${p.id}')">Comprar</button>
      </div>
    `;
  });
}

loadPlans();
