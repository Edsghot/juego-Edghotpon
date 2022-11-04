
/*
:::::::VARIABLES GLOBALES::::::::*/
const ataqueEn = document.getElementById('ataqueEnemigo')
const sectionM = document.getElementById('mensajes')
const resultadoM = document.getElementById('resultado')
const ataqueJu = document.getElementById('ataqueJugador')

const sectionMensaje = document.getElementById('total')
const sectionSeleccionarMascota = document.getElementById('seccion-de-seleccionar-personaje')
const sectionReiniciar = document.getElementById('Reiniciar')    
const btnMascotaJugador = document.getElementById('btnSeleccionar')   

const btnReiniciar = document.getElementById('btnReiniciar')

let personajes = []
let ataqueEnemigo = []
let opcionesPersonaje
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')
let btnFuego 
let btnAgua
let btnTierra 
let botones = []
let ataquesJugador = []
let ataquesPersonaje
let personajeJugador
let ataquesPersonajeEnemigo
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let mensajeF   


//::::::::FIN:::::::::::::

//clases
class Edghotpon{

    constructor(nombre,foto,vida){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }

}

let lupin = new Edghotpon('Lupin','./assets//lupin11.png',5)
let mehmed = new Edghotpon('Mehmed','./assets//mehmed1.png',5)
let luan = new Edghotpon('Luan','./assets//luan1.png',5)

lupin.ataques.push(
    {nombre: '🔥',id: 'btnFuego'},
    {nombre: '🔥',id: 'btnFuego'},
    {nombre: '🔥',id: 'btnFuego'},
    { nombre: '🌊', id: 'btnAgua'},
    {nombre: '🍁',id: 'btnTierra'},
)

mehmed.ataques.push(
    { nombre: '🌊', id: 'btnAgua'},
    { nombre: '🌊', id: 'btnAgua'},
    { nombre: '🌊', id: 'btnAgua'},
    {nombre: '🔥',id: 'btnFuego'},
    {nombre: '🍁',id: 'btnTierra'},
)

luan.ataques.push(
    {nombre: '🍁',id: 'btnTierra'},
    {nombre: '🍁',id: 'btnTierra'},
    {nombre: '🔥',id: 'btnFuego'},
    { nombre: '🌊', id: 'btnAgua'},
    {nombre: '🍁',id: 'btnTierra'},
)

personajes.push(lupin,mehmed,luan)

//funcion para generar numero aletorios en un rango
function aleatorio(min,max){
    return Math.floor(Math.random() * (max-min+1)+min)
}

//funcion para seleccionar el jugador del enemigo
function seleccionarPersonajeEnemigo(){
    let ataqueAleatorio = aleatorio(0,personajes.length-1)
    document.getElementById('spPersonajeEnemigo').innerHTML = (personajes[ataqueAleatorio].nombre)
    
    secuenciaAtaque()
}

//funcion para selecionar la mascota del jugador
function seleccionarPersonaje(){
    
    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    sectionSeleccionarAtaque.style.display = 'flex'

  
    sectionMensaje.style.display = 'flex'

    
    sectionSeleccionarMascota.style.display = 'none'

    let c=0;
    for(let i=0;i<personajes.length;i++){
        if(document.getElementById(personajes[i].nombre).checked){
            document.getElementById('spPersonajeJugador').innerHTML = (personajes[i].nombre) 
            personajeJugador = personajes[i].nombre
        }else{
            c++
        }
    }
    if(c==personajes.length){
        alert("error!... Selecciona una mascota!!")
    }

    extraerAtaques(personajeJugador)
    seleccionarPersonajeEnemigo()
    
    //llamando la funcion para escoger la mascota del enemigo
}

function extraerAtaques(personajeJugador){
    let ataques = []
    for(let i = 0;i<personajes.length;i++){
        if(personajeJugador === personajes[i].nombre){
            ataques = personajes[i].ataques
        }
    }
    
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque)=>{
        ataquesPersonaje = `
        <button id = "${ataque.id}" class="botonAtaque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesPersonaje
    })
    btnFuego = document.getElementById('btnFuego')
    btnAgua = document.getElementById('btnAgua')
    btnTierra = document.getElementById('btnTierra')
    
    botones = document.querySelectorAll('.BAtaque')
    console.log('botones: ',botones)
}

function secuenciaAtaque(){
    botones.forEach((boton) =>{
        boton.addEventListener('click',(e) => {
            if(e.target.textContent === '🔥'){
                ataquesJugador.push('FUEGO')
                console.log(ataquesJugador)
                boton.style.background = '#112f58'
                boton.disabled = true                
            }else if(e.target.textContent === '🌊'){
                ataquesJugador.push('AGUA')
                console.log(ataquesJugador)
                boton.style.background = '#112f58'
                boton.disabled = true                
            }else if(e.target.textContent === '🍁'){
                ataquesJugador.push('TIERRA')
                console.log(ataquesJugador)
                boton.style.background = '#112f58'
                boton.disabled = true                
            }
            ataqueAleatorioEnemigo()
        })
    })
    
}


function ataqueAleatorioEnemigo(){

    let poderes = ['AGUA','FUEGO','TIERRA']
    let ataque = aleatorio(0,2)


    ataqueEnemigo.push(poderes[ataque])

    console.log('enemigo: ',ataqueEnemigo)

    iniciarPelea()
}

function iniciarPelea(){
    if(ataquesJugador.length === 5){
        verificarGanador()
    }
}
//funcion para revisar las vidas
function revisarVidas(){

    if(victoriasJugador === victoriasEnemigo){
        crearMensajeFinal("Esto fue un Empate!!!!")
    }else if(vidasEnemigo > victoriasEnemigo){
        crearMensajeFinal("FELICITACIONES!! GANASTE")
    }else{
        crearMensajeFinal("lo siento, PERDISTE!!!")    
    }

}
function indexAmbosOponente(jugador,enemigo){
    indexAtaqueJugador = ataquesJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

//creando un mensaje  de ataques
function verificarGanador(){
    let spanVidasJugador = document.getElementById('vidasJugador')
    let spanVidasEnemigo = document.getElementById('vidasEnemigo')


    for(let index=0;index<ataquesJugador.length;index++){
        if(ataquesJugador[index] === ataqueEnemigo[index]){
            indexAmbosOponente(index,index)
            crearMensaje('EMPATE')

        }else if(ataquesJugador[index] == 'FUEGO' && ataqueEnemigo[index] == 'TIERRA'){
            
            indexAmbosOponente(index,index)
            crearMensaje('GANASTE')
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }else if(ataquesJugador[index] == 'AGUA' && ataqueEnemigo[index]  == 'FUEGO'){
            indexAmbosOponente(index,index)
            crearMensaje('GANASTE')
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }else if(ataquesJugador[index] == 'TIERRA' && ataqueEnemigo[index] == 'AGUA'){
            indexAmbosOponente(index,index)
            crearMensaje('GANASTE')
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }else{
            indexAmbosOponente(index,index)
            crearMensaje('PERDISTE') 
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }

    revisarVidas()
    
}

function crearMensaje(mensajeFinal){
    mensajeF = mensajeFinal
    //si nosotros queremos agregar algo creado con js y meter dentro del html se usa el appendChild

    //para crear un elemento de html con createElement

    let nuevoAtaqueJu = document.createElement('p')
    let nuevoAtaqueEn = document.createElement('p')

    nuevoAtaqueJu.innerHTML = indexAtaqueJugador
    nuevoAtaqueEn.innerHTML = indexAtaqueEnemigo

    ataqueJu.appendChild(nuevoAtaqueJu)
    ataqueEn.appendChild(nuevoAtaqueEn)
    
}


function crearMensajeFinal(resultadoF){
    //si nosotros queremos agregar algo creado con js y meter dentro del html se usa el appendChild
    let resultadoM = document.getElementById('resultado')

    //para crear un elemento de html con createElement
    resultadoM.innerHTML = resultadoF

}

//funcion MAIN donde inicia todo el juego
function iniciarJuego(){

    personajes.forEach((personaje) => {
        opcionesPersonaje = `    
        <input type="radio" name="personaje" id="${personaje.nombre}"/>                         
        <label class="tarjeta-de-personaje" for="${personaje.nombre}">
            <p>${personaje.nombre}</p>
            <img src="${personaje.foto}" alt="${personaje.nombre}">
        </label>
        `
        contenedorTarjetas.innerHTML += opcionesPersonaje

        })


    btnMascotaJugador.addEventListener('click',seleccionarPersonaje)
    
    btnReiniciar.addEventListener('click',reiniciarJuego)

}

function reiniciarJuego(){
    location.reload()
}

//llamando a la funcion iniciar con el evento load(cuando cargue la pagina)
window.addEventListener('load',iniciarJuego)

