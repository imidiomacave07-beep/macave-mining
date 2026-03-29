let token = ""
let username = ""

async function login() {
  username = document.getElementById("user").value
  const password = document.getElementById("pass").value
  const res = await fetch("/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  })
  const data = await res.json()
  token = data.token
  localStorage.setItem("token", token)
  localStorage.setItem("username", username)
  loadDashboard()
}

async function loadDashboard() {
  const res = await fetch("/api/wallet", {
    headers: { authorization: localStorage.getItem("token") }
  })
  const data = await res.json()
  document.getElementById("balance").innerText = "Balance: $" + data.balance
  document.getElementById("plans").innerHTML = data.plans.map(p => `
    <div>
      Plan ID: ${p.planId}, Amount: $${p.amount}, Profit: $${p.profit.toFixed(2)}
    </div>
  `).join("")
  document.getElementById("refLink").value = `${window.location.origin}/register?ref=${username}`
}
