//importacion de librerias

var HTTPServer = require('./controllers/Server')
var DB = require('./controllers/LocalDatabase')

//declaracion de variables
var db = new DB('./database/database.json')
var service_port = process.env.PORT
/*
*  Generate Products and Users
* */
require("dotenv").config();
if(process.env.GENERATED_VALUE_ACTIVATED == 'TRUE') {
    db.generateDataExample(Number(process.env.COUNT_USER_GENERATED), Number(process.env.COUNT_PRODUCT_GENERATED))
    console.log('Datos generados automaticamente')
}


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
//db.buscarProductoPorID('iBGqE2R_3T',function(r){ console.log(r) })
/*db.adicionarProducto("Caja de Musica",45.77,23,"musica",['juguete','bebe']
                    ,"Jueguete","juguete de musica","la mejor",[])
*/
//db.actualizarProducto('Jzc-pMeyUn','Tio Vivo',12.78,53,"juguete",['juguete','mesa','color'],"jugute giratorio para niños","A la venta en todas las tiendas","bueno",[])
//db.eliminarProducto('JoI5yfKk2x')

//parsin all incomming request into json
//app.use(express.json())

HTTPServer = new HTTPServer(service_port)
HTTPServer.startServer()



