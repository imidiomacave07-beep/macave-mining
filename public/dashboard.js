async function buyPlan(planId) {
  if (!userId) {
    alert("Faça login primeiro");
    return;
  }

  try {
    const res = await fetch("/api/plans/buy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userId,
        planId: planId
      })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Erro ao comprar plano");
      return;
    }

    // Atualiza dados no frontend
    activePlans.push(data.plan);
    balance += data.plan.price;

    updateBalance();
    updateActivePlans();

    alert("✅ Plano comprado com sucesso!");

  } catch (err) {
    console.error(err);
    alert("Erro de conexão com o servidor");
  }
}
