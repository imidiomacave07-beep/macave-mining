const token = localStorage.getItem("token");

if (!token) {
  alert("Faça login primeiro");
  window.location.href = "/login.html";
}

async function loadDashboard() {
  const res = await fetch("/api/dashboard", {
    headers: {
      Authorization: "Bearer " + token
    }
  });

  const data = await res.json();

  document.getElementById("email").innerText = data.email;
  document.getElementById("plan").innerText = data.plan;
  document.getElementById("balance").innerText = data.balance.toFixed(2);
}

async function updateEarnings() {
  await fetch("/api/earnings", {
    headers: {
      Authorization: "Bearer " + token
    }
  });

  loadDashboard();
}

loadDashboard();
