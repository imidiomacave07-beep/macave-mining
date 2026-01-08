let user;

async function login(email, password) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  user = await res.json();
  render();
}

async function requestWithdraw() {
  const amount = Number(withdrawAmount.value);
  const method = walletType.value;
  const destination = walletAddress.value;

  const res = await fetch("/api/withdraw/request", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: user._id,
      amount,
      method,
      destination
    })
  });

  const data = await res.json();
  alert(res.ok ? "Saque solicitado" : data.error);
}

async function loadAdminWithdraws() {
  const res = await fetch("/api/admin/withdraws");
  const list = await res.json();

  adminWithdraws.innerHTML = list.map((w, i) => `
    <div>
      ${w.email} | ${w.amount} | ${w.method}
      <button onclick="approve('${w.userId}',${w.index})">Aprovar</button>
      <button onclick="reject('${w.userId}',${w.index})">Rejeitar</button>
    </div>
  `).join("");
}

async function approve(userId, index) {
  await fetch("/api/admin/withdraw/action", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, index, action: "pago" })
  });
  loadAdminWithdraws();
}

async function reject(userId, index) {
  await fetch("/api/admin/withdraw/action", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, index, action: "rejeitado" })
  });
  loadAdminWithdraws();
}

function render() {
  if (user.isAdmin) {
    adminPanel.style.display = "block";
    loadAdminWithdraws();
  } else {
    dashboard.style.display = "block";
  }
}
