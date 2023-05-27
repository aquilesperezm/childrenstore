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

        this._app.post('/register', this._API.registerUser)

    }


}

module.exports = Server