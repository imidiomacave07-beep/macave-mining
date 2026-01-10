const content = document.getElementById("content");

/* TELA INICIAL */
content.innerHTML = `
  <h2>👋 Bem-vindo à Macave Mining</h2>
  <p>Use o menu abaixo para navegar na plataforma.</p>
`;

/* FUNÇÃO PRINCIPAL */
function showSection(section) {

  /* ⛏️ MINERAÇÃO */
  if (section === "mining") {
    content.innerHTML = `
      <h2>⛏️ Planos de Mineração</h2>

      <div class="card">
        <h3>Starter</h3>
        <p>Investimento: <strong>20 USD</strong></p>
        <p>Lucro diário: <strong>1.5%</strong></p>
        <p>Duração: 30 dias</p>
        <button onclick="alert('Compra em breve')">Comprar</button>
      </div>

      <div class="card">
        <h3>Standard</h3>
        <p>Investimento: <strong>50 USD</strong></p>
        <p>Lucro diário: <strong>2%</strong></p>
        <p>Duração: 30 dias</p>
        <button onclick="alert('Compra em breve')">Comprar</button>
      </div>

      <div class="card">
        <h3>Pro</h3>
        <p>Investimento: <strong>100 USD</strong></p>
        <p>Lucro diário: <strong>2.5%</strong></p>
        <p>Duração: 30 dias</p>
        <button onclick="alert('Compra em breve')">Comprar</button>
      </div>

      <div class="card">
        <h3>Premium</h3>
        <p>Investimento: <strong>200 USD</strong></p>
        <p>Lucro diário: <strong>3%</strong></p>
        <p>Duração: 30 dias</p>
        <button onclick="alert('Compra em breve')">Comprar</button>
      </div>
    `;
  }

  /* 💰 DEPÓSITO */
  if (section === "deposit") {
    content.innerHTML = `
      <h2>💰 Depósito</h2>
      <p>Escolha uma carteira e envie o valor do plano:</p>

      <p>USDT (TRC20)</p>
      <code onclick="copyText(this)">TX123TRC20</code>

      <p>USDT (BEP20)</p>
      <code onclick="copyText(this)">0xBEP20</code>

      <p>Bitcoin (BTC)</p>
      <code onclick="copyText(this)">1BTCADDRESS</code>
    `;
  }

  /* 💸 SAQUE */
  if (section === "withdraw") {
    content.innerHTML = `
      <h2>💸 Solicitar Saque</h2>

      <p>Valor mínimo de saque: <strong>10 USD</strong></p>

      <input placeholder="Valor do saque" type="number" />

      <select>
        <option value="TRC20">USDT (TRC20)</option>
        <option value="BEP20">USDT (BEP20)</option>
        <option value="BTC">Bitcoin (BTC)</option>
      </select>

      <input placeholder="Endereço da carteira" />

      <button onclick="alert('Saque enviado para análise')">
        Solicitar Saque
      </button>

      <p style="margin-top:10px;font-size:12px;color:#aaa">
        Saques são processados manualmente em até 24h.
      </p>
    `;
  }

  /* 📞 CONTATO */
  if (section === "contact") {
    content.innerHTML = `
      <h2>📞 Contato</h2>
      <p>Email: suporte@macavemining.com</p>
      <p>WhatsApp: +258 XXX XXX XXX</p>
    `;
  }
}

/* COPIAR CARTEIRA */
function copyText(el) {
  navigator.clipboard.writeText(el.innerText);
  alert("Endereço copiado");
}
