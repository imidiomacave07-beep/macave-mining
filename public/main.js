// Importa bibliotecas
const axios = require("axios");

// Pega as variáveis do Replit Secrets (.env)
const apiKey = process.env.NICEHASH_API_KEY;cbb2d048-796a-4d95-b26c-cb202974b1e2
const orgId = process.env.NICEHASH_ORG_ID;b2164e0e-2012-41a7-80b6-23193b90ace8
const apiSecret =235dd7df-e3e1-4b12-96c4-ed00db09901d40635209-fe0f-4341-94bf-0b36b8faf40c process.env.NICEHASH_API_SECRET; // guardado seguro

// Função para puxar dados da NiceHash
async function getMiningStats() {
  try {
    const response = await axios.get(
      "https://api2.nicehash.com/main/api/v2/mining/rigs",
      {
        headers: {
          "X-Organization-Id": orgId,
          "X-Api-Key": apiKey
          // apiSecret pode ser usado se a API exigir autenticação extra
        }
      }
    );

    // Exibe os dados no console
    console.log("=== Dados da Mineração ===");
    if (response.data.miningRigs && response.data.miningRigs.length > 0) {
      response.data.miningRigs.forEach((rig, index) => {
        console.log(`Rig ${index + 1}:`);
        console.log(`  Nome: ${rig.name}`);
        console.log(`  Status: ${rig.status}`);
        console.log(`  Hashrate: ${rig.hashrate} H/s`);
      });
    } else {
      console.log("Nenhum rig encontrado ou dados indisponíveis.");
    }
  } catch (error) {
    console.error("Erro ao conectar à API:", error.response?.data || error.message);
  }
}

// Chama a função ao iniciar o servidor
getMiningStats();

// Futuramente, podemos adicionar atualização automática ou mostrar no painel
