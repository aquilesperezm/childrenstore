/** var JsonDB = require('node-json-db').JsonDB,
 Config = require('node-json-db').Config


 const

 db.push("/test1", "super test");
 db.push("/test2/my/test", 5);


 async function test() {
    const result = await db.getData("/test1")
    console.log(result)
}

 Example:
 var DB = new DB('./database/database.json')

 DB.addData('/',{name:'Aquiles'})

 DB.getDataFromPath('/')
 .then(r => {
        console.log(r)
    })

 test()*/

var JsonDB = require('node-json-db').JsonDB,
    Config = require('node-json-db').Config

var MUser = require('../models/MUser'),
    MProduct = require('../models/MProduct')

var shortid = require('shortid');


class LocalDatabase {


    _MUser
    _MProduct

    constructor(databaseFilePath) {

        this.databaseFilePath = databaseFilePath
        this.db = new JsonDB(new Config(databaseFilePath, true, true, '/'))

        this._MUser = new MUser(this)
        this._MProduct = new MProduct(this)

    }

     generateDataExample(cantUsers, cantProducts) {

        MUser.getAleatoryUsers(cantUsers).then((value)=>{
            this.addData('/users', value)
        })
        var lista_productos = MProduct.getAleatoryProducts(cantProducts)


        this.addData('/products', lista_productos)

    }

    addData(path, data) {
        this.db.push(path, data);

    }

    async getDataFromPath(path) {
        const result = await this.db.getData(path)
        return result
    }

    // CRUD Usuario

     listarUsuarios(paging, callback) {
        this._MUser.listAllUsers(paging).then(callback)
    }

     buscarUsuario(username,callback){
        this._MUser.searchUser(username).then(callback)
    }

     adicionarUsuario(nombreCompleto, nombreUsuario, rol, password, token){
        this._MUser.addUsuario(nombreCompleto, nombreUsuario, rol, password, token)
    }

    actualizarUsuario(idUsuario, nombre_completo, username, rol, password){
        this._MUser.updateUsuario(idUsuario,nombre_completo, username, rol, password)
    }

    eliminarUsuario(idUsuario){
        this._MUser.deleteUsuario(idUsuario)
    }

    //CRUD Producto

    listarProductos(paging, callback) {
        this._MProduct.listProducts(paging).then(callback)
    }

    buscarProducto(productName,callback){
        return this._MProduct.searchProduct(productName).then(callback)
    }

    buscarProductoPorID(idSKU,callback){
        return this._MProduct.searchProductByID(idSKU).then(callback)
    }

    adicionarProducto(nombre, precio, cant_stock, categoria, tags, descripcion, info, valoracion, lista_imagenes_asoc){
        this._MProduct.addProduct(nombre, precio, cant_stock, categoria, tags, descripcion, info, valoracion, lista_imagenes_asoc)
    }

    actualizarProducto(idsku,nombre, precio, cant_stock, categoria, tags, descripcion, info, valoracion, lista_imagenes_asoc){
        this._MProduct.updateProduct(idsku,nombre, precio, cant_stock, categoria, tags, descripcion, info, valoracion, lista_imagenes_asoc)
    }

    eliminarProducto(idsku){
        this._MProduct.deleteProduct(idsku)
    }

}

module.exports = LocalDatabase