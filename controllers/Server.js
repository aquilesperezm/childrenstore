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
        this._app.post('/delete_product', this._API.deleteProduct)

        //API REST - PRODUCTOS
        /**
        * Entregar resultados de una busqueda enviando cualquiera de las caracteristicas del producto
        * una o varias (permitir paginacion en base de 10 resultados). Si no se envia ninguna caracteristica
        * el resultado debe ser la lista de articulos paginada
        * */
        this._app.post('/search_product', this._API.verifyToken, this._API.buscarProducto)
        /**
         * Entregar solo la cantidad de resultados de una busqueda enviando cualquiera de las caracteristicas
         * del producto
         * */
        this._app.post('/search_product_count',this._API.verifyToken , this._API.buscarProductoCantidad)

        /**
         * Vender un articulo. Elimina un articulo del stock
         *    - No se puede vender mas de 1 tipo de articulo a la vez (categoria)
         *    - No se puede vender mas de 1 articulo del mismo tipo (los mismo que lo anterior!!)
         *
         * */

         this._app.post('/sell_product_list',this._API.verifyToken,this._API.sellProductList)

         /**   Mostrar la lista de productos vendidos **/

         this._app.post('/sold_products',this._API.soldProducts)

        /**   Mostrar la ganacia total **/

        this._app.post('/total_gain',this._API.totalGain)

        /**   Mostrar los productos que tienen stock en 0 **/

    }


}

module.exports = Server