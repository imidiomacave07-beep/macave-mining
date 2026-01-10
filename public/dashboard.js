<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Macave Mining</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <!-- LANDING PAGE / INICIAL -->
  <div id="landingPage" style="text-align:center; margin-top:50px;">
    <h1># Macave Mining</h1>
    <p>Escolha uma opção para começar:</p>

    <div class="landing-buttons" style="margin-top:20px;">
      <button onclick="showLandingTab('mining')">⛏️ Mineração</button>
      <button onclick="showLandingTab('deposit')">💰 Depósito</button>
      <button onclick="showLandingTab('contact')">📞 Contato</button>
      <button onclick="goToLogin()">🔑 Login / Dashboard</button>
    </div>

    <!-- ABAS PÚBLICAS -->
    <div id="mining" class="landing-tab" style="display:none; margin-top:20px;">
      <h2>Planos de Mineração</h2>
      <div id="plans"></div>
    </div>

    <div id="deposit" class="landing-tab" style="display:none; margin-top:20px;">
      <h2>Depósito</h2>
      <ul>
        <li>USDT (TRC20): TXxxxxxxxxxxxxxxxx</li>
        <li>USDT (BEP20): 0xBEP20xxxxxxxxxxx</li>
        <li>Bitcoin (BTC): 1Bxxxxxxxxxxxxxxxx</li>
        <li>Ethereum (ERC20): 0xERC20xxxxxxxxxxx</li>
      </ul>
      <p>Após enviar fundos, faça login para ativar planos.</p>
    </div>

    <div id="contact" class="landing-tab" style="display:none; margin-top:20px;">
      <h2>Contato & Novidades</h2>
      <p>Email: suporte@macavemining.com</p>
      <p>WhatsApp: +258 xxx xxx xxx</p>
      <div style="margin-top:15px; background:#e6f0ff; padding:10px; border-radius:8px;">
        <h4>📢 Promoções & Publicidade</h4>
        <p>Aqui você pode colocar banners, anúncios e novidades da plataforma.</p>
      </div>
    </div>

  </div>

  <!-- DASHBOARD INTERNO -->
  <div id="dashboardPage" style="display:none;">
    <!-- Aqui entra o dashboard com saldo, planos ativos, saques -->
  </div>

  <script src="js/dashboard.js"></script>
  <script>
    function showLandingTab(tabId) {
      document.querySelectorAll(".landing-tab").forEach(tab => {
        tab.style.display = "none";
      });
      document.getElementById(tabId).style.display = "block";
    }

    function goToLogin() {
      document.getElementById("landingPage").style.display = "none";
      document.getElementById("dashboardPage").style.display = "block";
    }

    // CARREGAR PLANOS PÚBLICOS
    const plansData = [
      { id: 1, name: "Plano Básico", price: 20, daily: 1.5, days: 30 },
      { id: 2, name: "Plano Standard", price: 50, daily: 2, days: 30 },
      { id: 3, name: "Plano Pro", price: 100, daily: 2.5, days: 40 },
      { id: 4, name: "Plano Premium", price: 200, daily: 3, days: 45 }
    ];

    function loadPlans(plans) {
      const container = document.getElementById("plans");
      container.innerHTML = "";

      plans.forEach(plan => {
        const planDiv = document.createElement("div");
        planDiv.className = "plan-card";
        planDiv.innerHTML = `
          <h4>${plan.name}</h4>
          <p>Preço: ${plan.price} USD</p>
          <p>Lucro diário: ${plan.daily}% por ${plan.days} dias</p>
          <button onclick="alert('Simulação de compra: Plano ${plan.name}')">Comprar</button>
        `;
        container.appendChild(planDiv);
      });
    }

    loadPlans(plansData);
  </script>
</body>
</html>
