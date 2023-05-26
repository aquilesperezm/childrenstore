const express = require("express");
require('dotenv').config();



class Server {

    constructor() {

    }

    startServer() {
        const app = express();
        const PORT = process.env.PORT || 4111;

        app.listen(PORT, console.log("Server don start for port: " + PORT))

    }


}

module.exports = Server