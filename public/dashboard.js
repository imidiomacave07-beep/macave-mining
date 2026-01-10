function loadActivePlans() {
  const el = document.getElementById("activePlans");
  el.innerHTML = "";

  const activeOnly = activePlans.filter(p => p.status === "active");

  if (activeOnly.length === 0) {
    el.innerHTML = "<p>Nenhum plano comprado ainda.</p>";
    return;
  }

  activeOnly.forEach(p => {
    el.innerHTML += `
      <div class="plan">
        <strong>${p.name}</strong><br>
        Lucro diário: ${p.daily}%<br>
        Total ganho: ${p.earned.toFixed(2)} $<br>
        Método: ${p.method}<br>
        Status: ${p.status}
      </div>
    `;
  });
}
