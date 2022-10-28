
/*
:::::::VARIABLES GLOBALES::::::::*/

let mascotas = ['lupin','mehmed','luan']
let ataqueJugador,ataqueEnemigo 
let vidasJugador = 3
let vidasEnemigo = 3
let mensajeF    
//::::::::FIN:::::::::::::

//funcion para generar numero aletorios en un rango
function aleatorio(min,max){
    return Math.floor(Math.random() * (max-min+1)+min)
}

//funcion para seleccionar el jugador del enemigo
function seleccionarMascotaEnemigo(){
    let ataqueAleatorio = aleatorio(0,3)
    document.getElementById('spPersonajeEnemigo').innerHTML = (mascotas[ataqueAleatorio].toUpperCase())
}

//funcion para selecionar la mascota del jugador
function seleccionarMascota(){
    
    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    sectionSeleccionarAtaque.style.display = 'block'


    let sectionSeleccionarMascota = document.getElementById('seccion-de-seleccionar-personaje')
    sectionSeleccionarMascota.style.display = 'none'

    seleccionarMascotaEnemigo()
    let c=0;
    for(let i=0;i<mascotas.length;i++){
        if(document.getElementById(mascotas[i]).checked){
            document.getElementById('spPersonajeJugador').innerHTML = (mascotas[i].toUpperCase()) 
        }else{
            c++
        }
    }
    if(c==mascotas.length){
        alert("error!... Selecciona una mascota!!")
    }
    
    //llamando la funcion para escoger la mascota del enemigo
    
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
    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    
    if(vidasJugador == 0){
        crearMensajeFinal("Lo siento :c Perdiste")
        sectionReiniciar.style.display = 'block'
        //sectionSeleccionarAtaque.style.display = 'none' 
    }else if(vidasEnemigo == 0){
        crearMensajeFinal("FELICITACIONES!! GANASTE")
        sectionReiniciar.style.display = 'block'
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

    //para crear un elemento de html con createElement
    let parrafo = document.createElement('p')
    parrafo.innerHTML = 'Tu personaje ataco con '+ataqueJugador+', El personaje de tu enemigo ataco con '+ataqueEnemigo+' ->'+mensajeF

    sectionM.appendChild(parrafo)
}


function crearMensajeFinal(resultadoF){
    //si nosotros queremos agregar algo creado con js y meter dentro del html se usa el appendChild
    let sectionM = document.getElementById('mensajes')

    //para crear un elemento de html con createElement
    let parrafo = document.createElement('p')
    parrafo.innerHTML = resultadoF

    sectionM.appendChild(parrafo)

    let btnFuego = document.getElementById('btnFuego')
    btnFuego.disabled = true
    let btnAgua = document.getElementById('btnAgua')
    btnAgua.disabled = true
    let btnTierra = document.getElementById('btnTierra')
    btnTierra.disabled = true
}

//funcion MAIN donde inicia todo el juego
function iniciarJuego(){
    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    sectionSeleccionarAtaque.style.display = 'none'

    let sectionReiniciar = document.getElementById('Reiniciar')
    sectionReiniciar.style.display = 'none'

    let btnMascotaJugador = document.getElementById('btnSeleccionar')
    btnMascotaJugador.addEventListener('click',seleccionarMascota)

    
    let btnFuego = document.getElementById('btnFuego')
    btnFuego.addEventListener('click',ataqueFuego)
    let btnAgua = document.getElementById('btnAgua')
    btnAgua.addEventListener('click',ataqueAgua)
    let btnTierra = document.getElementById('btnTierra')
    btnTierra.addEventListener('click',ataqueTierra)
    

    let btnReiniciar = document.getElementById('btnReiniciar')
    btnReiniciar.addEventListener('click',reiniciarJuego)

}

function reiniciarJuego(){
    location.reload()
}

//llamando a la funcion iniciar con el evento load(cuando cargue la pagina)
window.addEventListener('load',iniciarJuego)

