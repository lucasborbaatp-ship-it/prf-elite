
let dados = JSON.parse(localStorage.getItem("dadosPRF")) || []

function atualizarDashboard(){
let totalQ = 0
let totalA = 0

dados.forEach(d=>{
totalQ += d.q
totalA += d.a
})

let media = totalQ ? (totalA/totalQ)*100 : 0
let nota = (media/100)*120

document.getElementById("media").innerText = media.toFixed(1) + "%"
document.getElementById("nota").innerText = nota.toFixed(1)
}

function registrar(){

let disciplina = document.getElementById("disciplina").value
let q = Number(document.getElementById("questoes").value)
let a = Number(document.getElementById("acertos").value)
let e = Number(document.getElementById("erros").value)

let cebraspe = a - e

dados.push({disciplina,q,a,e,cebraspe})

localStorage.setItem("dadosPRF",JSON.stringify(dados))

document.getElementById("resultado").innerHTML =
"Pontuação CEBRASPE: "+cebraspe

atualizarDashboard()
}

function taf(){

let corrida = Number(document.getElementById("corrida").value)
let barra = Number(document.getElementById("barra").value)

let corridaStatus = corrida >= 2400 ? "OK" : "Treinar"
let barraStatus = barra >= 5 ? "OK" : "Treinar"

document.getElementById("tafResultado").innerHTML =
"Corrida: "+corridaStatus+"<br>Barra: "+barraStatus
}

atualizarDashboard()
