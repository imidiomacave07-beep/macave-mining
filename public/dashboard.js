const API_URL = "http://localhost:10000/api";

// MOSTRAR PLANOS
async function loadPlans() {
  try {
    const res = await fetch(`${API_URL}/plans`);
    const plans = await res.json();

    const container = document.getElementById("plans");
    container.innerHTML = "";

    plans.forEach(plan => {
      const div = document.createElement("div");
      div.className = "plan";
      div.innerHTML = `
        <h3>${plan.name}</h3>
        <p>Preço: $${plan.price}</p>
        <p>Lucro diário: ${plan.dailyMin}% – ${plan.dailyMax}%</p>
        <button>Comprar</button>
      `;
      container.appendChild(div);
    });
  } catch (e) {
    console.error("Erro ao carregar planos:", e);
  }
}

// CHAMA AO CARREGAR
loadPlans();
