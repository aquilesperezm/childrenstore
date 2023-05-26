//importacion de librerias
var express = require('express')
var HTTPServer = require('./controllers/Server')
var DB = require('./controllers/LocalDatabase')

//declaracion de variables
var db = new DB('./database/database.json')
var app = express()
/*
*  Generate Products and Users
* */
require("dotenv").config();
db.generateDataExample(Number(process.env.COUNT_USER_GENERATED),Number(process.env.COUNT_PRODUCT_GENERATED))

//parsin all incomming request into json
app.use(express.json())

HTTPServer = new HTTPServer(app,process.env.PORT)
HTTPServer.startServer()



