const API_URL="/api";
let userId=null,balance=0,activePlans=[];

async function register(){
  const username=document.getElementById("username").value;
  const password=document.getElementById("password").value;
  if(!username||!password)return alert("Preencha os campos");
  const res=await fetch(`${API_URL}/auth/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username,password})});
  const data=await res.json();
  if(res.ok){alert("Registrado! Faça login");}else alert(data.error);
}

async function login(){
  const username=document.getElementById("username").value;
  const password=document.getElementById("password").value;
  if(!username||!password)return alert("Preencha os campos");
  const res=await fetch(`${API_URL}/auth/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username,password})});
  const data=await res.json();
  if(res.ok){
    userId=data.userId;
    document.getElementById("usernameDisplay").textContent=username;
    document.getElementById("landingPage").style.display="none";
    document.getElementById("dashboardPage").style.display="block";
    loadPlans(); loadActivePlans();
  }else alert(data.error);
}

async function loadPlans(){
  const res=await fetch(`${API_URL}/plans`);
  const plans=await res.json();
  const container=document.getElementById("plans"); container.innerHTML="";
  plans.forEach(plan=>{
    const div=document.createElement("div");
    div.className="plan-card";
    div.innerHTML=`<h4>${plan.name}</h4><p>Preço: ${plan.price} USD</p><p>Lucro diário: ${plan.daily}% / ${plan.days} dias</p><button onclick="buyPlan(${plan.id})">Comprar</button>`;
    container.appendChild(div);
  });
}

async function buyPlan(planId){
  const res=await fetch(`${API_URL}/plans/buy`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId,planId})});
  const data=await res.json();
  if(res.ok)alert("Plano comprado! Aguarde aprovação do admin");else alert(data.error);
}

async function loadActivePlans(){
  const usersRes=await fetch(`${API_URL}/auth/users`);
  const users=await usersRes.json();
  const user=users.find(u=>u._id===userId); if(!user) return;
  balance=user.balance; activePlans=user.activePlans;
  document.getElementById("balance").textContent=balance.toFixed(2);
  const container=document.getElementById("activePlans"); container.innerHTML="";
  if(activePlans.length===0){container.innerHTML="<p>Nenhum plano ativo.</p>";return;}
  activePlans.forEach(p=>{
    if(p.status==="active"){ const daysPassed=Math.floor((Date.now()-p.startDate)/(1000*60*60*24)); p.earned=p.price*(p.daily/100)*daysPassed;}
    const div=document.createElement("div");
    div.className="plan-card";
    div.innerHTML=`<strong>${p.name}</strong><br>Valor: ${p.price} USD<br>Lucro diário: ${p.daily}%<br>Ganho atual: ${p.earned?.toFixed(2)||0} $<br>Status: ${p.status}`;
    container.appendChild(div);
  });
  loadWithdrawHistory(user);
}

async function requestWithdraw(){
  const amount=parseFloat(document.getElementById("withdrawAmount").value);
  const method=document.getElementById("walletType").value;
  const destination=document.getElementById("walletAddress").value;
  if(!amount||amount<=0)return alert("Valor inválido");
  if(!destination||destination.length<10)return alert("Endereço inválido");
  const res=await fetch(`${API_URL}/withdraw/request`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId,amount,method,destination})});
  const data=await res.json();
  if(res.ok){alert("Saque solicitado!");loadActivePlans();}else alert(data.error);
}

function loadWithdrawHistory(user){
  const container=document.getElementById("withdrawHistory"); container.innerHTML="";
  if(!user.withdraws || user.withdraws.length===0){container.innerHTML="<p>Nenhum saque.</p>";return;}
  user.withdraws.forEach(w=>{
    const div=document.createElement("div");
    div.innerHTML=`${w.date}: ${w.amount} $ - ${w.method} - ${w.destination}`;
    container.appendChild(div);
  });
}

setInterval(loadActivePlans,5000);
