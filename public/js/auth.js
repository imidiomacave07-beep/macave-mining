const API_URL = "https://SEU-SERVICO.onrender.com/api";

async function login() {
  const email = loginEmail.value;
  const password = loginPassword.value;

  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  if (!res.ok) return alert(data.error);

  localStorage.setItem("token", data.token);
  window.location.href = "/dashboard.html";
}

async function register() {
  const email = regEmail.value;
  const password = regPassword.value;

  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  if (!res.ok) return alert(data.error);

  alert("Conta criada. Faça login.");
}
