const content = document.getElementById("content");

function showSection(section) {
  if (section === "mining") {
    content.innerHTML = `
      <h2>⛏️ Planos de Mineração</h2>

      <div class="card">
        <h3>Plano Starter</h3>
        <p>Preço: 20 USD</p>
        <p>Lucro: 1.5% ao dia</p>
        <button>Comprar</button>
      </div>

      <div class="card">
        <h3>Plano Standard</h3>
        <p>Preço: 50 USD</p>
        <p>Lucro: 2% ao dia</p>
        <button>Comprar</button>
      </div>

      <div class="card">
        <h3>Plano Pro</h3>
        <p>Preço: 100 USD</p>
        <p>Lucro: 2.5% ao dia</p>
        <button>Comprar</button>
      </div>
    `;
  }

  if (section === "deposit") {
    content.innerHTML = `
      <h2>💰 Depósito</h2>

      <p>USDT (TRC20)</p>
      <code onclick="copyText(this)">TX123TRC20</code>

      <p>USDT (BEP20)</p>
      <code onclick="copyText(this)">0xBEP20</code>

      <p>Bitcoin (BTC)</p>
      <code onclick="copyText(this)">1BTCADDRESS</code>
    `;
  }

  if (section === "withdraw") {
    content.innerHTML = `
      <h2>💸 Solicitar Saque</h2>

      <input placeholder="Valor">
      <select>
        <option>USDT (TRC20)</option>
        <option>USDT (BEP20)</option>
        <option>BTC</option>
      </select>
      <input placeholder="Endereço da carteira">
      <button>Solicitar</button>
    `;
  }

  if (section === "contact") {
    content.innerHTML = `
      <h2>📞 Contato</h2>
      <p>Email: suporte@macavemining.com</p>
      <p>WhatsApp: +258 XXX XXX XXX</p>
    `;
  }
}

function copyText(el) {
  navigator.clipboard.writeText(el.innerText);
  alert("Endereço copiado!");
}

// Abre mineração por padrão
showSection("mining");
