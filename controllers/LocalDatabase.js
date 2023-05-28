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

    static _DETECTED_ROL

    constructor(databaseFilePath) {

        this.databaseFilePath = databaseFilePath
        this.db = new JsonDB(new Config(databaseFilePath, true, true, '/'))

        this._MUser = new MUser(this)
        this._MProduct = new MProduct(this)

    }

    generateDataExample(cantUsers, cantProducts) {

        MUser.getAleatoryUsers(cantUsers).then((value) => {
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

    buscarUsuario(username, callback) {
        // if(LocalDatabase._DETECTED_ROL)
        return this._MUser.searchUser(username).then(callback)
    }

    buscarUsuarioPorToken(token, callback) {
        return this._MUser.searchUserByToken(token).then(callback)
    }

    adicionarUsuario(nombreCompleto, nombreUsuario, rol, password, token) {
        this._MUser.addUsuario(nombreCompleto, nombreUsuario, rol, password, token)
    }

    actualizarUsuario(idUsuario, nombre_completo, username, rol, password) {
        this._MUser.updateUsuario(idUsuario, nombre_completo, username, rol, password)
    }

    eliminarUsuario(idUsuario) {
        this._MUser.deleteUsuario(idUsuario)
    }

    //CRUD Productos

    async listarProductos(paging, callback) {
        var d = LocalDatabase._DETECTED_ROL.find((v) => {
            return v == 'READ'
        })

        if (d == 'READ') {
            return await this._MProduct.listProducts(paging).then(callback)
        }
        return {successfull: false, cause: "No tiene permisos"}
    }

    buscarProducto(productName, callback) {

        return this._MProduct.searchProduct(productName).then(callback)
    }

    buscarProductoPorID(idSKU, callback) {
        return this._MProduct.searchProductByID(idSKU).then(callback)
    }

    buscarProductoPorFiltros(filtros, per_page, callback) {
        return this._MProduct.searchProductsByFilters(filtros, per_page).then(callback)
    }

    async adicionarProducto(nombre, precio, cant_stock, categoria, tags, descripcion, info, valoracion, lista_imagenes_asoc) {

        var d = LocalDatabase._DETECTED_ROL.find((v) => {
            return v == 'CREATE'
        })

        if (d == 'CREATE') {
            return await this._MProduct.addProduct(nombre, precio, cant_stock, categoria, tags
                , descripcion, info, valoracion, lista_imagenes_asoc)
        } else return {successfull: false, cause: "No tiene permisos"}

    }

    async actualizarProducto(idsku, nombre, precio, cant_stock, categoria, tags, descripcion, info, valoracion, lista_imagenes_asoc) {
        var d = LocalDatabase._DETECTED_ROL.find((v) => {
            return v == 'UPDATE'
        })

        if (d == 'UPDATE') {
            return await this._MProduct.updateProduct(idsku, nombre, precio, cant_stock, categoria, tags, descripcion, info, valoracion, lista_imagenes_asoc)
        } else return {successfull: false, cause: "No tiene permisos"}
    }

    eliminarTipoProducto(idsku) {
        this._MProduct.deleteProductType(idsku)
    }

    async eliminarProducto(idsku) {
        var d = LocalDatabase._DETECTED_ROL.find((v) => {
            return v == 'DELETE'
        })

        if (d == 'DELETE') {

            return await this._MProduct.deleteProductType(idsku)

        } else return {successfull: false, cause: "No tiene permisos"}
    }

    //Venta de Productos

}

module.exports = LocalDatabase