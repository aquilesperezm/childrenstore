'use strict'
const
    ConfigDB = require('node-json-db').Config,
    JsonDB = require('node-json-db').JsonDB,
    User = require('./User'),
    Product = require('./Product')


class ChildStore {

    UserList
    ProductList
    Database

    constructor() {

        this.Database = new JsonDB(new ConfigDB("database/storage.db", true, false, '/'));

        this.UserList = new Array()
        this.ProductList = new Array()
    }



    getUserList(){
        return this.UserList
    }

    getProductList(){
        return this.ProductList
    }


}

module.exports = ChildStore