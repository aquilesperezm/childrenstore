require('dotenv').config();
var express = require('express')
var API = require('./Api')

class Server {

    _app
    _port

    _API

    constructor(port) {
        this._app = express()
        this._port = port

        this._API = new API()

    }

    startServer() {

        //convertir todas las peticiones a formato json
        this._app.use(express.json())

        //comenzamos el servidor por el puerto seleccionado en la variable .env
        this._app.listen(this._port, console.log("Server starting in port: " + this._port))

        //API REST - USERS
        this._app.post('/register', this._API.registerUser)
        this._app.post('/login', this._API.loginUser)
        this._app.post('/welcome', this._API.verifyToken, this._API.welcomeUser)

        //CRUD PRODUCTS
        this._app.post('/create_product', this._API.createProduct)
        this._app.post('/read_products', this._API.listAllProducts)
        this._app.post('/update_product', this._API.updateProduct)
       // this._app.post('/delete_product', this._API.eliminarProducto)

        //API REST - PRODUCTOS
        /*
        * Entregar resultados de una busqueda enviando cualquiera de las caracteristicas del producto
        * una o varias (permitir paginacion en base de 10 resultados). Si no se envia ninguna caracteristica
        * el resultado debe ser la lista de articulos paginada
        * */
        this._app.post('/searchproduct', this._API.verifyToken, this._API.buscarProducto)
        /**
         * Entregar solo la cantidad de resultados de una busqueda enviando cualquiera de las caracteristicas
         * del producto
         * */
        this._app.post('/searchproductcount',this._API.verifyToken , this._API.buscarProductoCantidad)


    }


}

module.exports = Server