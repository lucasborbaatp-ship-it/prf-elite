

let dados = JSON.parse(localStorage.getItem("dados")) || []

let ctx = document.getElementById("grafico").getContext("2d")

let grafico = new Chart(ctx, {
type:"line",
data:{
labels:[],
datasets:[{
label:"Aproveitamento (%)",
data:[]
}]
}
})

function registrar(){

let q = Number(document.getElementById("questoes").value)
let a = Number(document.getElementById("acertos").value)
let e = Number(document.getElementById("erros").value)

let perc = (a/q)*100

dados.push(perc)

localStorage.setItem("dados",JSON.stringify(dados))

grafico.data.labels = dados.map((_,i)=>i+1)
grafico.data.datasets[0].data = dados
grafico.update()

}

function salvarFlash(){

let texto = document.getElementById("flashcard").value
localStorage.setItem("flash",texto)

}

document.getElementById("flashcard").value =
localStorage.getItem("flash") || ""

