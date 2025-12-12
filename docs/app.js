const API = "https://freemine-api.onrender.com";  // troque pela URL real do seu backend depois

async function registrar(){
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  await fetch(`${API}/register`,{
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({email, senha})
  });
  localStorage.setItem("email", email);
  carregarDash();
}

async function carregarDash(){
  document.getElementById("auth").style.display = "none";
  document.getElementById("dash").style.display = "block";
  const email = localStorage.getItem("email");
  const r = await fetch(`${API}/user/${email}`).then(res => res.json());
  document.getElementById("saldo").textContent = r.balance.toFixed(8);
  document.getElementById("hashrate").textContent = r.hashrate;
}

async function simularDep(){
  const v = parseFloat(document.getElementById("depValor").value);
  const email = localStorage.getItem("email");
  await fetch(`${API}/deposit`,{
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({email, amount: v})
  });
  carregarDash();
}

async function sacar(){
  const end = document.getElementById("sacEnd").value;
  const val = parseFloat(document.getElementById("sacVal").value);
  const email = localStorage.getItem("email");
  await fetch(`${API}/withdraw`,{
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({email, address: end, amount: val})
  });
  carregarDash();
}

// ao carregar a página
if(localStorage.getItem("email")) carregarDash();