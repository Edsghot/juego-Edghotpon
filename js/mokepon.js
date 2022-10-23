
function seleccionarMascota(){
    let mascotas = ['hipodoge','capipepo','ratigueya','langostelvis','tucapalma','pydos']
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
}

function iniciarJuego(){
    let btnMascotaJugador = document.getElementById('btnSeleccionar')
    btnMascotaJugador.addEventListener('click',seleccionarMascota)

}

//llamando a la funcion iniciar con el evento load(cuando cargue la pagina)
window.addEventListener('load',iniciarJuego)

