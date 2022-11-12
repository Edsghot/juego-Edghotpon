//importando la libreria express
const express = require("express")
//creando la aplicacion
const app = express()

app.get("/",(req,res) =>{
    res.send("mostrando los datos en el servidor")
})


//hacer que escuche la peticion de los clientes
app.listen(8080,() =>{
    console.log("servidor funcionando")
})
