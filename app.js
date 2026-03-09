

let dados=JSON.parse(localStorage.getItem("dados"))||[]
let progresso=JSON.parse(localStorage.getItem("topicos"))||{}
let flashcards=JSON.parse(localStorage.getItem("flash"))||{}

let ctx=document.getElementById("grafico").getContext("2d")

let grafico=new Chart(ctx,{
type:"line",
data:{labels:[],datasets:[{label:"Aproveitamento (%)",data:[]}]} 
})

function atualizarGrafico(){

grafico.data.labels=dados.map((_,i)=>i+1)
grafico.data.datasets[0].data=dados
grafico.update()

}

function registrar(){

let q=Number(document.getElementById("q").value)
let a=Number(document.getElementById("a").value)

let perc=(a/q)*100

dados.push(perc)

localStorage.setItem("dados",JSON.stringify(dados))

atualizarGrafico()

}

function carregarMaterias(){

let select=document.getElementById("materia")
let flashSelect=document.getElementById("flashMateria")

for(let m in subjects){

let opt=document.createElement("option")
opt.value=m
opt.textContent=m

let opt2=opt.cloneNode(true)

select.appendChild(opt)
flashSelect.appendChild(opt2)

}

mostrarTopicos()

}

function mostrarTopicos(){

let materia=document.getElementById("materia").value
let div=document.getElementById("topicos")

div.innerHTML=""

subjects[materia].forEach(t=>{

let id=materia+"-"+t

let checked=progresso[id]?"checked":""

div.innerHTML+=`<label>
<input type="checkbox" ${checked} onchange="toggleTopico('${id}')">
${t}
</label>`

})

}

function toggleTopico(id){

progresso[id]=!progresso[id]

localStorage.setItem("topicos",JSON.stringify(progresso))

}

function salvarFlash(){

let materia=document.getElementById("flashMateria").value
let texto=document.getElementById("flashText").value

flashcards[materia]=texto

localStorage.setItem("flash",JSON.stringify(flashcards))

}

document.getElementById("materia").addEventListener("change",mostrarTopicos)

document.getElementById("flashMateria").addEventListener("change",()=>{

let m=document.getElementById("flashMateria").value

document.getElementById("flashText").value=flashcards[m]||""

})

carregarMaterias()
atualizarGrafico()

