// GARANTIR QUE O JS CARREGOU
console.log("Dashboard JS carregado");

// ELEMENTO DE CONTEÚDO
const content = document.getElementById("content");

// BOTÕES
document.getElementById("btn-mining").onclick = () => showMining();
document.getElementById("btn-deposit").onclick = () => showDeposit();
document.getElementById("btn-withdraw").onclick = () => showWithdraw();
document.getElementById("btn-contact").onclick = () => showContact();

/* ⛏️ MINERAÇÃO */
function showMining() {
  content.innerHTML = `
    <h2>⛏️ Planos de Mineração</h2>

    <div class="card">
      <h3>Starter</h3>
      <p>20 USD</p>
      <p>1.5% / dia</p>
      <button>Comprar</button>
    </div>

    <div class="card">
      <h3>Standard</h3>
      <p>50 USD</p>
      <p>2% / dia</p>
      <button>Comprar</button>
    </div>

    <div class="card">
      <h3>Pro</h3>
      <p>100 USD</p>
      <p>2.5% / dia</p>
      <button>Comprar</button>
    </div>

    <div class="card">
      <h3>Premium</h3>
      <p>200 USD</p>
      <p>3% / dia</p>
      <button>Comprar</button>
    </div>
  `;
}

/* 💰 DEPÓSITO */
function showDeposit() {
  content.innerHTML = `
    <h2>💰 Depósito</h2>
    <p>USDT (TRC20)</p>
    <code>TX123TRC20</code>

    <p>USDT (BEP20)</p>
    <code>0xBEP20</code>

    <p>BTC</p>
    <code>1BTCADDRESS</code>
  `;
}

/* 💸 SAQUE */
function showWithdraw() {
  content.innerHTML = `
    <h2>💸 Saque</h2>
    <input placeholder="Valor" />
    <input placeholder="Endereço da carteira" />
    <button>Solicitar Saque</button>
  `;
}

/* 📞 CONTATO */
function showContact() {
  content.innerHTML = `
    <h2>📞 Contato</h2>
    <p>Email: suporte@macavemining.com</p>
    <p>WhatsApp: +258 XXX XXX XXX</p>
  `;
}
