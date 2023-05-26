var HTTPServer = require('./controllers/Server')
var DB = require('./controllers/LocalDatabase')

var db = new DB('./database/database.json')

require("dotenv").config();

//HTTPServer = new HTTPServer()
//HTTPServer.startServer()


db.generateDataExample(Number(process.env.COUNT_USER_GENERATED),Number(process.env.COUNT_PRODUCT_GENERATED))

