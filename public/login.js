async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const msg = document.getElementById("msg");

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      msg.innerText = data.error;
      return;
    }

    // guardar token
    localStorage.setItem("token", data.token);

    // redirecionar
    window.location.href = "/dashboard";
  } catch (err) {
    msg.innerText = "Erro no servidor";
  }
}
