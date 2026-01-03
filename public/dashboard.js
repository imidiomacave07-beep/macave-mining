// dados dos planos
const planos = [
  { name: "Básico 🚀", price: 20, benefits: ["Mineração 24/7", "Suporte básico"] },
  { name: "Bronze 🥉", price: 30, benefits: ["Mineração 24/7", "Suporte via chat"] },
  { name: "Prata 🥈", price: 50, benefits: ["Mineração 24/7", "Relatórios semanais"] },
  { name: "Ouro 🥇", price: 100, benefits: ["Mineração avançada", "Suporte prioritário"] },
  { name: "Platina 💎", price: 200, benefits: ["Mineração máxima", "Acesso a bônus secretos"] },
  { name: "Diamante 🔥", price: 500, benefits: ["Mineração máxima", "Relatórios detalhados", "Suporte dedicado"] },
  { name: "Elite ⚡", price: 1000, benefits: ["Mineração elite", "Suporte 24h", "Promoções exclusivas"] },
  { name: "VIP ✨", price: 5000, benefits: ["Mineração máxima + bônus", "Suporte VIP", "Eventos exclusivos"] },
];

// carregar dados do usuário
async function carregarUsuario() {
  const token = localStorage.getItem("token");
  if (!token) return alert("Login necessário");

  const resUser = await fetch("/api/auth/me", { headers: { Authorization: "Bearer " + token } });
  const user = await resUser.json();

  document.getElementById("userName").innerText = user.name;
  document.getElementById("userEmail").innerText = user.email;
  document.getElementById("userBalance").innerText = user.balance + " M-Coin";
}

// exibir planos
function mostrarPlanos() {
  const div = document.getElementById("planos");
  planos.forEach(p => {
    const b = p.benefits.map(b => `<li>${b}</li>`).join("");
    div.innerHTML += `
      <div class="plano">
        <h3>${p.name}</h3>
        Preço: $${p.price}<br>
        <ul>${b}</ul>
        <button onclick="pagarCripto(${p.price}, '${p.name}')">Pagar com USDT</button>
      </div>
    `;
  });
}

// pagamento
function pagarCripto(valor, plano) {
  const wallet = "COLOCA_AQUI_O_TEU_ENDERECO_USDT";

  document.body.innerHTML += `
    <div class="modal">
      <h3>Pagamento USDT (TRC20)</h3>
      <p>Plano: <b>${plano}</b></p>
      <p>Valor: <b>$${valor}</b></p>
      <p>Envie para:</p>
      <p><b>${wallet}</b></p>

      <button onclick="confirmarPagamento(${valor}, '${plano}')">
        Já paguei
      </button>
    </div>
  `;
}

function confirmarPagamento(valor, plano) {
  fetch("/api/payments/crypto", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token")
    },
    body: JSON.stringify({ amount: valor, plan: plano })
  })
    .then(res => res.json())
    .then(() => alert("Pagamento em verificação"));
}

// iniciar
carregarUsuario();
mostrarPlanos();
