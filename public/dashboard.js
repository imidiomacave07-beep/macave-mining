const user = localStorage.getItem('user')

// Planos
fetch('/api/plans')
.then(r=>r.json())
.then(plans=>{
plans.forEach(p=>{
const lucroMin=(p.price*p.min)/100
const lucroMax=(p.price*p.max)/100

document.getElementById('plans').innerHTML+=`
<div>
<h3>${p.name}</h3>
<p>Preço $${p.price}</p>
<p>Lucro ${p.min}% - ${p.max}%</p>
<p>Ganho diário $${lucroMin.toFixed(2)} - $${lucroMax.toFixed(2)}</p>
<button onclick="buy('${p.name}')">Comprar</button>
</div>`
})
})

function deposit(){
fetch('/api/wallet/deposit',{
method:'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify({
username:user,
amount:dep.value
})
})
.then(r=>r.json())
.then(d=>{
balance.innerText=d.balance
alert(d.message)
})
}

function withdraw(){
fetch('/api/wallet/withdraw',{
method:'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify({
username:user,
amount:wit.value
})
})
.then(r=>r.json())
.then(d=>{
balance.innerText=d.balance
alert(d.message)
})
  }
