var express = require('express')
var app = express()

var HTTPServer = require('./controllers/Server')
var DB = require('./controllers/LocalDatabase')

var db = new DB('./database/database.json')

/*
*  Generate Products and Users
* */
require("dotenv").config();
db.generateDataExample(Number(process.env.COUNT_USER_GENERATED),Number(process.env.COUNT_PRODUCT_GENERATED))

//parsin all incomming request into json
app.use(express.json())

HTTPServer = new HTTPServer(app,process.env.PORT)
HTTPServer.startServer()



