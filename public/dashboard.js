async function buyPlan(planId) {
  try {
    const res = await fetch(`${API_URL}/api/plans/buy`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        planId
      })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      return;
    }

    balance = data.balance;
    activePlans = data.plans;

    updateBalanceDisplay();
    updateActivePlans();

    alert("Plano comprado com sucesso!");
  } catch (err) {
    alert("Erro ao comprar plano");
  }
}
