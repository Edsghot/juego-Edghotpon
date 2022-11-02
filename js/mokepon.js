
/*
:::::::VARIABLES GLOBALES::::::::*/

const sectionMensaje = document.getElementById('total')
const sectionSeleccionarMascota = document.getElementById('seccion-de-seleccionar-personaje')
const sectionReiniciar = document.getElementById('Reiniciar')    
const btnMascotaJugador = document.getElementById('btnSeleccionar')   
const btnFuego = document.getElementById('btnFuego')
const btnAgua = document.getElementById('btnAgua')
const btnTierra = document.getElementById('btnTierra')
const btnReiniciar = document.getElementById('btnReiniciar')

let personajes = []
let ataqueJugador,ataqueEnemigo 
let opcionesPersonaje
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
let personajeJugador
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

function ataqueAgua(){
    ataqueJugador = 'Agua'
    ataqueAleatorioEnemigo()
}
function ataqueFuego(){
    ataqueJugador = 'Fuego'  
    ataqueAleatorioEnemigo()
}
function ataqueTierra(){
    ataqueJugador = 'Tierra'
    ataqueAleatorioEnemigo()
}
function ataqueAleatorioEnemigo(){
    let ataque = aleatorio(1,3)
    if(ataque == 1){
        ataqueEnemigo = 'Agua'
    }else if(ataque ==2){
        ataqueEnemigo = 'Fuego'
    }else{
        ataqueEnemigo = 'Tierra'
    }
    verificarGanador()
}

//funcion para revisar las vidas
function revisarVidas(){
    let sectionReiniciar = document.getElementById('Reiniciar')   
    
    if(vidasJugador == 0){
        crearMensajeFinal("Lo siento :c Perdiste")
        sectionReiniciar.style.display = 'flex'
        //sectionSeleccionarAtaque.style.display = 'none' 
    }else if(vidasEnemigo == 0){
        crearMensajeFinal("FELICITACIONES!! GANASTE")
        sectionReiniciar.style.display = 'flex'
       // sectionSeleccionarAtaque.style.display = 'none' 
    }


}

//creando un mensaje  de ataques
function verificarGanador(){
    let spanVidasJugador = document.getElementById('vidasJugador')
    let spanVidasEnemigo = document.getElementById('vidasEnemigo')
     

    if(ataqueJugador == ataqueEnemigo){
        mensajeF = 'EMPATE'
        crearMensaje()
    }else if(ataqueJugador == 'Fuego' && ataqueEnemigo == 'Tierra'){
        vidasEnemigo--
        mensajeF = 'GANASTE'
        crearMensaje()
    }else if(ataqueJugador == 'Agua' && ataqueEnemigo == 'Fuego'){
        vidasEnemigo--
        mensajeF = 'GANASTE'
        crearMensaje()
    }else if(ataqueJugador == 'Tierra' && ataqueEnemigo == 'Agua'){
        vidasEnemigo--
        mensajeF = 'GANASTE'
        crearMensaje()
    }else{
        vidasJugador--
        mensajeF = 'PERDISTE'
        crearMensaje()
        
        
        
    }

    spanVidasEnemigo.innerHTML = vidasEnemigo
    spanVidasJugador.innerHTML = vidasJugador
    
    revisarVidas()
    
}

function crearMensaje(){
    //si nosotros queremos agregar algo creado con js y meter dentro del html se usa el appendChild
    let sectionM = document.getElementById('mensajes')
    let resultadoM = document.getElementById('resultado')
    let ataqueJu = document.getElementById('ataqueJugador')
    let ataqueEn = document.getElementById('ataqueEnemigo')

    //para crear un elemento de html con createElement

    let nuevoAtaqueJu = document.createElement('p')
    let nuevoAtaqueEn = document.createElement('p')

    resultadoM.innerHTML = mensajeF
    nuevoAtaqueJu.innerHTML = ataqueJugador
    nuevoAtaqueEn.innerHTML = ataqueEnemigo

}


function crearMensajeFinal(resultadoF){
    //si nosotros queremos agregar algo creado con js y meter dentro del html se usa el appendChild
    let resultadoM = document.getElementById('resultado')

    //para crear un elemento de html con createElement
    resultadoM.innerHTML = resultadoF


    let btnFuego = document.getElementById('btnFuego')
    btnFuego.disabled = true
    let btnAgua = document.getElementById('btnAgua')
    btnAgua.disabled = true
    let btnTierra = document.getElementById('btnTierra')
    btnTierra.disabled = true
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
    btnFuego.addEventListener('click',ataqueFuego)
    btnAgua.addEventListener('click',ataqueAgua)
    btnTierra.addEventListener('click',ataqueTierra)
    
    btnReiniciar.addEventListener('click',reiniciarJuego)

}

function reiniciarJuego(){
    location.reload()
}

//llamando a la funcion iniciar con el evento load(cuando cargue la pagina)
window.addEventListener('load',iniciarJuego)

