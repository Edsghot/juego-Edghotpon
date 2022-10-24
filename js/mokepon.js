
/*
:::::::VARIABLES GLOBALES::::::::*/

let mascotas = ['hipodoge','capipepo','ratigueya','langostelvis','tucapalma','pydos']
let ataqueJugador,ataqueEnemigo 
//::::::::FIN:::::::::::::

//funcion para generar numero aletorios en un rango
function aleatorio(min,max){
    return Math.floor(Math.random() * (max-min+1)+min)
}

//funcion para seleccionar el jugador del enemigo
function seleccionarMascotaEnemigo(){
    let ataqueAleatorio = aleatorio(0,5)
    document.getElementById('spMascotaEnemigo').innerHTML = (mascotas[ataqueAleatorio].toUpperCase())
}

//funcion para selecionar la mascota del jugador
function seleccionarMascota(){
    seleccionarMascotaEnemigo()
    let c=0;
    for(let i=0;i<mascotas.length;i++){
        if(document.getElementById(mascotas[i]).checked){
            document.getElementById('spMascotaJugador').innerHTML = (mascotas[i].toUpperCase()) 
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
    alert(ataqueJugador)
}
function ataqueFuego(){
    ataqueJugador = 'Fuego'
    alert(ataqueJugador)
}
function ataqueTierra(){
    ataqueJugador = 'Tierra'
    alert(ataqueJugador)
}
function ataqueEnemigo(){
    let ataque = aleatorio(1,3)
    if(ataque == 1){
        ataqueEnemigo = 'Agua'
    }else if(ataque ==2){
        ataqueEnemigo = 'Fuego'
    }else{
        ataqueEnemigo = 'Tierra'
    }
    alert(ataqueEnemigo)
}

//funcion MAIN donde inicia todo el juego
function iniciarJuego(){
    let btnMascotaJugador = document.getElementById('btnSeleccionar')
    btnMascotaJugador.addEventListener('click',seleccionarMascota)

    
    let btnFuego = document.getElementById('btnFuego')
    btnFuego.addEventListener('click',ataqueFuego)
    let btnAgua = document.getElementById('btnAgua')
    btnAgua.addEventListener('click',ataqueAgua)
    let btnTierra = document.getElementById('btnTierra')
    btnTierra.addEventListener('click',ataqueTierra)

    
}

//llamando a la funcion iniciar con el evento load(cuando cargue la pagina)
window.addEventListener('load',iniciarJuego)

