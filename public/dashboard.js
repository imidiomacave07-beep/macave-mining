document.getElementById("mining-tab").addEventListener("click", async () => {
  const response = await fetch("/api/plans");
  const plans = await response.json();
  const container = document.getElementById("plans");
  container.innerHTML = plans.map(p => `
    <div class="plan">
      <h3>${p.name}</h3>
      <p>Preço: $${p.price}</p>
      <p>Lucro: ${p.profit}</p>
      <button>Comprar</button>
    </div>
  `).join("");
});

// Outros tabs podem ser preenchidos de forma semelhante
