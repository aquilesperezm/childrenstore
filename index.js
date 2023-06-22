'use strict'
const express = require('express'),
    db = require('node-json-db'),
    jwt = require('jsonwebtoken'),
    env = require('dotenv').config(),
    app = express(),
    app_port = process.env.APP_PORT,

    User = require('./classes/User'),
    Product = require('./classes/Product')


const ChildStore = require('./classes/ChildStore'),
    Core = new ChildStore();

//Core.Database.updateUser('dFaOZYFv9J',new User("Aquiles","Actualizacion","administrator"))
//Core.Database.deleteUser('dFaOZYFv9J')

/*Core.Database.updateProduct('5zh5dtFw45',new Product('test',121.11,31,'Test categoria',['test,test2'],'test desc'
                         ,'test info','test value',['url1','url2']))
*/

//Core.Database.deleteProduct('5zh5dtFw45')

 Core.Database.searchProductByFeatures([
     /*{name: 'Cere'},
     {stock_count: '20', indicator: 'more'},
     {price: '30,76', indicator: 'less'},
     {category: 'bebe'},*/
     {tags: { criteria: 'higiene' } }

]).then((v)=>{
    console.log(v)
})



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

app.get('/', (req, res) => {
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
    .delete((req, res) => {
        res.send('Delete the book')
    })

console.log('Comenzado la aplicacion Children Store')
app.listen(app_port, () => {
    console.log('Servidor iniciado por el puerto ' + app_port)
})






