const adminUser = JSON.parse(localStorage.getItem("user"));

if (!adminUser || !adminUser.isAdmin) {
  alert("Acesso negado");
  location.href = "/";
}

async function loadWithdraws() {
  const res = await fetch("/api/admin/withdraws");
  const withdraws = await res.json();

  withdrawList.innerHTML = withdraws.map((w, i) => `
    <div style="border:1px solid #ccc;padding:10px;margin:5px">
      <b>${w.email}</b><br>
      Valor: ${w.amount}<br>
      Rede: ${w.method}<br>
      Carteira: ${w.destination}<br>
      Data: ${w.date}<br>
      <button onclick="action('${w.userId}',${w.index},'pago')">Aprovar</button>
      <button onclick="action('${w.userId}',${w.index},'rejeitado')">Rejeitar</button>
    </div>
  `).join("");
}

async function action(userId, index, action) {
  await fetch("/api/admin/withdraw/action", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, index, action })
  });
  loadWithdraws();
}

function logout() {
  localStorage.removeItem("user");
  location.href = "/";
}

loadWithdraws();
