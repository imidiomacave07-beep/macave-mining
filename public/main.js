let user = { referralCode: "TESTCODE" } // Substituir pelo fetch do user real

function updateReferral(){
  document.getElementById("referral-link").value = `${window.location.origin}/register?ref=${user.referralCode}`
}
function copyReferral(){
  const input = document.getElementById("referral-link")
  input.select()
  document.execCommand("copy")
  alert("Link copiado!")
}
updateReferral()
