
/*
:::::::VARIABLES GLOBALES::::::::*/
const ataqueEn = document.getElementById('ataqueEnemigo')
const sectionM = document.getElementById('mensajes')
const resultadoM = document.getElementById('resultado')
const ataqueJu = document.getElementById('ataqueJugador')


const sectionMensaje = document.getElementById('total')
const sectionSeleccionarPersonaje = document.getElementById('seccion-de-seleccionar-personaje')
const sectionReiniciar = document.getElementById('Reiniciar')    
const btnMascotaJugador = document.getElementById('btnSeleccionar')   

const btnReiniciar = document.getElementById('btnReiniciar')


const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let contador = 0
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
let personajeJugadorObjeto
let ataquesPersonajeEnemigo
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let mensajeF
//canvas
let lienzo = mapa.getContext("2d")   
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './assets/mapa5.png'
let alturaBuscado
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 450

if(anchoDelMapa > anchoMaximoDelMapa){
    anchoDelMapa = anchoMaximoDelMapa-20 
}

alturaBuscado = anchoDelMapa*600/800

mapa.width = anchoDelMapa
mapa.height = alturaBuscado

//::::::::FIN:::::::::::::

//clases
class Edghotpon{

    constructor(nombre,foto,vida,fotoMapa,x=170,y=30){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.x = x
        this.y = y
        this.ancho = 50
        this.alto = 50
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
    
    pintarPersonaje(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto,        
        )
    }

}

let lupin = new Edghotpon('Lupin','./assets//lupin11.png',5,'./assets//lupinIcon.png')
let mehmed = new Edghotpon('Mehmed','./assets//mehmed1.png',5,'./assets//mehmedIcon.png')
let luan = new Edghotpon('Luan','./assets//luan1.png',5,'./assets//luanIcon.png')


let lupinEnemigo = new Edghotpon('Lupin','./assets//lupin11.png',5,'./assets//lupinIcon.png',200,190)
let mehmedEnemigo = new Edghotpon('Mehmed','./assets//mehmed1.png',5,'./assets//mehmedIcon.png',190,250)
let luanEnemigo = new Edghotpon('Luan','./assets//luan1.png',5,'./assets//luanIcon.png',300,190)


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


lupinEnemigo.ataques.push(
    {nombre: '🔥',id: 'btnFuego'},
    {nombre: '🔥',id: 'btnFuego'},
    {nombre: '🔥',id: 'btnFuego'},
    { nombre: '🌊', id: 'btnAgua'},
    {nombre: '🍁',id: 'btnTierra'},
)

mehmedEnemigo.ataques.push(
    { nombre: '🌊', id: 'btnAgua'},
    { nombre: '🌊', id: 'btnAgua'},
    { nombre: '🌊', id: 'btnAgua'},
    {nombre: '🔥',id: 'btnFuego'},
    {nombre: '🍁',id: 'btnTierra'},
)

luanEnemigo.ataques.push(
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
function seleccionarPersonajeEnemigo(enemigo){
    document.getElementById('spPersonajeEnemigo').innerHTML = enemigo.nombre
    secuenciaAtaque()
}

//funcion para selecionar la mascota del jugador
function seleccionarPersonaje(){
    
    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    sectionSeleccionarAtaque.style.display = 'none'
    sectionMensaje.style.display = 'none'

    sectionSeleccionarPersonaje.style.display = 'none'

    //sectionSeleccionar una mapa

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
    iniciarMapa()
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
    contador++
    if(contador === 5){
        contador = 0
        verificarGanador()
    }
}
//funcion para revisar las vidas
function revisarVidas(){

    if(victoriasJugador === victoriasEnemigo){
        crearMensajeFinal("Esto fue un Empate!!!!")
    }else if(victoriasJugador > victoriasEnemigo){
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

    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    sectionSeleccionarAtaque.style.display = 'none'
    sectionMensaje.style.display = 'none'
    sectionVerMapa.style.display = 'none'    

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

function pintarCanvas(){

    personajeJugadorObjeto.x = personajeJugadorObjeto.x +personajeJugadorObjeto.velocidadX
    personajeJugadorObjeto.y = personajeJugadorObjeto.y + personajeJugadorObjeto.velocidadY
    lienzo.clearRect(0,0,mapa.width,mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    personajeJugadorObjeto.pintarPersonaje()
    lupinEnemigo.pintarPersonaje()
    mehmedEnemigo.pintarPersonaje()
    luanEnemigo.pintarPersonaje()
    if(personajeJugadorObjeto.velocidadX !== 0 || personajeJugadorObjeto.velocidadY !== 0){
        revisarColision(lupinEnemigo)
        revisarColision(mehmedEnemigo)
        revisarColision(luanEnemigo)
    }
}

function moverDerecha(){
    personajeJugadorObjeto.velocidadX = 5
}
function moverIzquierda(){
    personajeJugadorObjeto.velocidadX = -5}
function moverAbajo(){
    personajeJugadorObjeto.velocidadY = 5}
function moverArriba(){
    personajeJugadorObjeto.velocidadY = -5
    
}

function detenerMovimiento(){
    personajeJugadorObjeto.velocidadX = 0
    personajeJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event){
    switch(event.key){
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
        moverIzquierda()
        break
        case 'ArrowRight':
            moverDerecha()
            break
        default:            
            break
    }    
}

function iniciarMapa(){

    sectionVerMapa.style.display = 'flex'
    personajeJugadorObjeto = obtenerObjetoMascota()
    intervalo = setInterval(pintarCanvas,50)

    window.addEventListener('keydown',sePresionoUnaTecla)
    window.addEventListener('keyup', detenerMovimiento)
   
}

function obtenerObjetoMascota(){
    for(let i = 0;i<personajes.length;i++){
        if(personajeJugador === personajes[i].nombre){
            return personajes[i]
        }
    }
}

function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    
    const arribaPersonaje =  personajeJugadorObjeto.y
    const abajoPersonaje = personajeJugadorObjeto.y + personajeJugadorObjeto.alto
    const derechaPersonaje = personajeJugadorObjeto.x + personajeJugadorObjeto.ancho
    const izquierdaPersonaje = personajeJugadorObjeto.x



    if(abajoPersonaje < arribaEnemigo ||
        arribaPersonaje > abajoEnemigo ||
        derechaPersonaje < izquierdaEnemigo||
        izquierdaPersonaje > derechaEnemigo     
    ){
        return 
    }

    detenerMovimiento()
    clearInterval(intervalo)
    seleccionarPersonajeEnemigo(enemigo)
    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionMensaje.style.display = 'flex'
    sectionVerMapa.style.display = 'none'

}
//llamando a la funcion iniciar con el evento load(cuando cargue la pagina)
window.addEventListener('load',iniciarJuego)

