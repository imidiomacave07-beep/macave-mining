const plansDiv = document.getElementById("plans");

async function loadPlans() {
  const res = await fetch("/api/plans");
  const plans = await res.json();

  plansDiv.innerHTML = plans.map(p => `
    <div style="border:1px solid #ccc;padding:10px;margin:10px;">
      <h3>${p.name}</h3>
      <p>Preço: $${p.price}</p>
      <p>Lucro diário: ${p.dailyMin}% – ${p.dailyMax}%</p>
      <p>Duração: ${p.duration} dias</p>
      <button onclick="buyPlan(${p.id})">Comprar</button>
    </div>
  `).join("");
}

function buyPlan(planId){
  alert("Plano comprado com sucesso (simulação)!");
}

function showTab(tabId){
  document.querySelectorAll(".tab").forEach(t => t.style.display="none");
  document.getElementById(tabId).style.display="block";
}

loadPlans();
