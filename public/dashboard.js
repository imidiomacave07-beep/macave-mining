async function carregarUsuario() {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/login.html";
    return;
  }

  const res = await fetch("/api/auth/me", {
    headers: {
      Authorization: "Bearer " + token
    }
  });

  if (!res.ok) {
    localStorage.removeItem("token");
    window.location.href = "/login.html";
    return;
  }

  const user = await res.json();

  document.getElementById("saldo").innerText = user.balance;
  document.getElementById("nome").innerText = user.name;
}

carregarUsuario();
