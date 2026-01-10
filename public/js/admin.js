console.log("✅ admin.js carregado");

function loadPendingPlans() {
  const div = document.getElementById("pendingPlans");
  div.innerHTML = "<h3>Planos Pendentes</h3>";

  if (!window.users) window.users = {};

  let hasPending = false;

  for (let userId in window.users) {
    const user = window.users[userId];
    user.activePlans.forEach((plan, index) => {
      if (plan.status === "pending") {
        hasPending = true;
        const el = document.createElement("div");
        el.innerHTML = `
          <strong>${plan.name}</strong> - Usuário: ${userId}<br>
          Método: ${plan.method}<br>
          <button onclick="approvePlan('${userId}', ${index})">Aprovar</button>
        `;
        div.appendChild(el);
      }
    });
  }

  if (!hasPending) div.innerHTML += "<p>Nenhum plano pendente.</p>";
}

function approvePlan(userId, index) {
  window.users[userId].activePlans[index].status = "active";
  alert("Plano aprovado!");
  loadPendingPlans();
}

function approveAll() {
  for (let userId in window.users) {
    const user = window.users[userId];
    user.activePlans.forEach(plan => {
      if (plan.status === "pending") plan.status = "active";
    });
  }
  alert("Todos os planos pendentes foram aprovados!");
  loadPendingPlans();
}

loadPendingPlans();
