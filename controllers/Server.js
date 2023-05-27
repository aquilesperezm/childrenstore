require('dotenv').config();



class Server {

    _app
    _port
    constructor(app,port) {
    this._app = app
    this._port = port
    }

    startServer() {

        //convertir todas las peticiones a formato json
        this._app.use(this._app.jsonp())

        //comenzamos el servidor por el puerto seleccionado en la variable .env
        this._app.listen(this._port, console.log("Server starting in port: " + this._port))

        this._app.post('/register',function(req,res){
            console.log('Escuchando a POST')
        })

    }


}

module.exports = Server