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

        this.Database = new JsonDB(new ConfigDB('storage.db', true, false, '/'));

        this.UserList = new Array()
        this.ProductList = new Array()

        this.Database.push('/users',[])
    }

    async addUser(newUser){
        var userlist = await this.Database.getData("/users");
        userlist.push(newUser)
        await this.Database.push('/users',userlist)
    }



    getUserList(){
        return this.UserList
    }

    getProductList(){
        return this.ProductList
    }


}

module.exports = ChildStore