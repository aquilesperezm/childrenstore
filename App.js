//importacion de librerias
var express = require('express')
var HTTPServer = require('./controllers/Server')
var DB = require('./controllers/LocalDatabase')

//declaracion de variables
var db = new DB('./database/database.json')
var app = express()
/*
*  Generate Products and Users
* */
require("dotenv").config();
//db.generateDataExample(Number(process.env.COUNT_USER_GENERATED), Number(process.env.COUNT_PRODUCT_GENERATED))

/*db.listarUsuarios(0,function(r){
    console.log(r)
})*/

/*db.buscarUsuario('amanda',function(r){
    console.log(r)
})*/

//db.adicionarUsuario("Aquiles Perez Miranda","akiles","Administrator","P@ssw0rd1**")

//db.actualizarUsuario('D-VdrHrfc','Yenisleidys Rodriguez Martinez','yeni','User','root')

//db.eliminarUsuario('D-VdrHrfc')


//db.listarProductos(0,function(r){ console.log(r) })
//db.buscarProducto('Monitor para bebes',function(r){ console.log(r) })
//db.buscarProductoPorID('lR1b43jWq8',function(r){ console.log(r) })
/*db.adicionarProducto("Caja de Musica",45.77,23,"musica",['juguete','bebe']
                    ,"Jueguete","juguete de musica","la mejor",[])
*/
//db.actualizarProducto('PdRwYDpWf-N','Silla voladora',12.78,53,"voladora",['silla','jueguete'],"Silla voladora","la mejor","super",[])
//db.eliminarProducto('37-dmUFfzAs')

//parsin all incomming request into json
//app.use(express.json())

//HTTPServer = new HTTPServer(app,process.env.PORT)
//HTTPServer.startServer()



