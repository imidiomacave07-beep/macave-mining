const API_URL = "http://localhost:10000/api";

function showTab(tab) {
  document.querySelectorAll(".tab").forEach(t => t.style.display = "none");
  document.getElementById(tab).style.display = "block";
}

// Register
function register() {
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;
  fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ email, password })
  })
  .then(res => res.json())
  .then(data => alert(data.message || data.error));
}

// Login
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ email, password })
  })
  .then(res => res.json())
  .then(data => alert(data.message || data.error));
}

// Load mining plans
function loadPlans() {
  fetch(`${API_URL}/plans`)
    .then(res => res.json())
    .then(plans => {
      const container = document.getElementById("plans");
      container.innerHTML = "";
      plans.forEach(p => {
        container.innerHTML += `
          <div>
            <h3>${p.name}</h3>
            <p>Preço: ${p.price} USD</p>
            <p>Lucro: ${p.dailyMin}% - ${p.dailyMax}% / dia</p>
            <button>Comprar</button>
          </div>
        `;
      });
    });
}

// Request withdraw
async function requestWithdraw() {
  const amount = parseFloat(document.getElementById("withdrawAmount").value);
  const walletType = document.getElementById("walletType").value;
  const walletAddress = document.getElementById("walletAddress").value;

  if(!walletAddress || walletAddress.length < 10) return alert("Endereço inválido");
  if(!amount || amount <= 0) return alert("Valor inválido");

  try {
    const res = await fetch(`${API_URL}/withdraw/request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: 1, amount, method: walletType, destination: walletAddress })
    });
    const data = await res.json();
    alert(data.message || data.error);
  } catch {
    alert("Erro de conexão");
  }
}

// Initialize
loadPlans();
