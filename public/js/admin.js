const API_URL="/api";

async function loadUsers(){
  const res=await fetch(`${API_URL}/auth/users`);
  const users=await res.json();
  const container=document.getElementById("usersList");
  container.innerHTML="";
  users.forEach((user)=>{
    const userDiv=document.createElement("div");
    userDiv.className="plan-card";
    userDiv.innerHTML=`<strong>${user.username}</strong><br>Saldo: ${user.balance.toFixed(2)} $<h4>Planos Ativos:</h4><div id="plans-${user._id}"></div>`;
    container.appendChild(userDiv);

    const plansDiv=document.getElementById(`plans-${user._id}`);
    if(!user.activePlans || user.activePlans.length===0){plansDiv.innerHTML="<p>Nenhum plano.</p>";return;}
    user.activePlans.forEach((p,index)=>{
      const pDiv=document.createElement("div");
      pDiv.innerHTML=`${p.name} - Status: ${p.status} - Ganho Atual: ${p.earned?.toFixed(2)||0} $`;
      if(p.status==="pending"){
        const btn=document.createElement("button");
        btn.textContent="Aprovar";
        btn.onclick=()=>approvePlan(user._id,index);
        pDiv.appendChild(btn);
      }
      plansDiv.appendChild(pDiv);
    });
  });
}

async function approvePlan(userId,index){
  const res=await fetch(`${API_URL}/plans/approve`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId,index})});
  const data=await res.json();
  if(res.ok){alert(data.message);loadUsers();}else alert(data.error);
}

loadUsers();
setInterval(loadUsers,5000);
