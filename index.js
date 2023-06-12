'use strict'
const express = require('express'),
    db = require('node-json-db'),
    jwt = require('jsonwebtoken'),
    env = require('dotenv').config(),
    app = express(),
    app_port = process.env.APP_PORT

const ChildStore = require('./classes/ChildStore')


/*
*  response.send(request.body);
* */
app.use(express.json());

/*var user1 = new User('a','a','administrator')
console.log(user1.getIdUser())
*/
/*
*  METHOD / ACTIONS
*  POST - CREATE
*  GET  - READ
*  PUT - UPDATE
*  DELETE - DELETE
* */

app.get('/',(req,res)=>{
    res.send('<h1>Hola mundo</h1>')

})

app.route('/book')
    .get((req, res) => {
        let k = new Object()
        k.name = "Nombre"
        k.id = "16941"
        res.json(k)
    })
    .post((req, res) => {
        res.send('Add a book')
    })
    .put((req, res) => {
        res.send('Update the book')
    })
    .delete((req,res)=>{
        res.send('Delete the book')
    })

console.log('Comenzado la aplicacion Children Store')
app.listen(app_port, ()=>{
    console.log('Servidor iniciado por el puerto ' + app_port)
})






