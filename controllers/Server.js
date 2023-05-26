require('dotenv').config();



class Server {

    _app
    _port
    constructor(app,port) {
    this._app = app
    this._port = port
    }

    startServer() {

        this._app.listen(this._port, console.log("Server don start for port: " + this._port))

        this._app.post('/register',function(req,res){
            console.log('Escuchando a POST')
        })

    }


}

module.exports = Server