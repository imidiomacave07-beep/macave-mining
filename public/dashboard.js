const plansDiv = document.getElementById("plans");

async function loadPlans() {
  const res = await fetch("/api/plans");
  const plans = await res.json();
  plansDiv.innerHTML = plans.map(p => `
    <div>
      <h3>${p.name}</h3>
      <p>Preço: $${p.price}</p>
      <p>Lucro: ${p.dailyMin}% – ${p.dailyMax}% / dia</p>
      <button>Comprar</button>
    </div>
  `).join("");
}

loadPlans();

function showTab(tabId){
  document.querySelectorAll(".tab").forEach(t => t.style.display="none");
  document.getElementById(tabId).style.display="block";
}
