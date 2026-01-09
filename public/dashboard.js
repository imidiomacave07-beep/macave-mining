let user = JSON.parse(localStorage.getItem("user"));

function renderPlans() {
  activePlans.innerHTML = user.plans.length
    ? user.plans.map(p => `
        <div>
          <b>${p.name}</b><br>
          Lucro diário: ${p.profit}<br>
          Última mineração: ${new Date(p.lastMined).toLocaleDateString()}
        </div>
      `).join("")
    : "Nenhum plano comprado ainda.";
}

function render() {
  balanceEl.innerText = user.balance;
  renderPlans();
}

render();
