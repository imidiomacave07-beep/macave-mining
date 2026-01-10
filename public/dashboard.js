const API_URL = "https://SEU-SERVICO.onrender.com/api";

function showTab(id) {
  document.querySelectorAll(".tab").forEach(tab => {
    tab.style.display = "none";
  });
  document.getElementById(id).style.display = "block";
}

function checkLogin() {
  const token = localStorage.getItem("token");

  if (token) {
    document.getElementById("publicArea").style.display = "none";
    document.getElementById("privateArea").style.display = "block";
  } else {
    document.getElementById("publicArea").style.display = "block";
    document.getElementById("privateArea").style.display = "none";
  }
}

async function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.error || "Erro no login");
    return;
  }

  localStorage.setItem("token", data.token);
  checkLogin();
}

async function register() {
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.error || "Erro ao registrar");
    return;
  }

  alert("Conta criada com sucesso. Faça login.");
}

function logout() {
  localStorage.removeItem("token");
  checkLogin();
}

checkLogin();
