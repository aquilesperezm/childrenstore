const express = require("express");
require('dotenv').config();



class Server {

    constructor() {

    }

    startServer() {
        const app = express();
        const PORT = process.env.PORT || 4111;

        app.listen(PORT, console.log("Server don start for port: " + PORT))

        app.post('/register',function(req,res){
            console.log('Escuchando a POST')
        })

    }


}

module.exports = Server