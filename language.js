let lang = "en";

function detectLanguage() {
  const browserLang = navigator.language.slice(0,2);

  const supported = ["pt","en","es","fr","de","it","ru","zh","ar","hi"];

  if (supported.includes(browserLang)) {
    return browserLang;
  }

  return "en";
}

async function loadLanguage(selectedLang){
  lang = selectedLang || detectLanguage();

  const res = await fetch(`/locales/${lang}.json`);
  const data = await res.json();

  document.getElementById("welcome").innerText = data.welcome;
  document.getElementById("login").innerText = data.login;
  document.getElementById("register").innerText = data.register;
  document.getElementById("dashboard").innerText = data.dashboard;
  document.getElementById("balance").innerText = data.balance;
  document.getElementById("invest").innerText = data.invest;
  document.getElementById("history").innerText = data.history;
  document.getElementById("profile").innerText = data.profile;
  document.getElementById("logout").innerText = data.logout;
}

// carregar automaticamente ao entrar
window.onload = () => {
  loadLanguage();
};
