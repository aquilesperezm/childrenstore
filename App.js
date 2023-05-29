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

HTTPServer = new HTTPServer(service_port)
HTTPServer.startServer()



