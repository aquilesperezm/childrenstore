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

        this.Database = new JsonDB(new ConfigDB('database/storage.db', true, false, '/'));

        this.UserList = new Array()
        this.ProductList = new Array()

        this.Database.push('/users',[])
    }

    generateStorageData(cantUsers,cantProducts){

        let names = ['Adams','Baker','Clark','Davis','Evans','Frank','Ghosh','Hills','Irwin','Jones',
                           'Klein','Lopez','Mason','Nalty','Ochoa','Patel','Quinn','Reily','Smith','Trott',
                           'Usman','Valdo','White','Xiang','Yakub','Zafar']

        let descriptions = `Lorem ipsum dolor sit amet, consectetur adipiscing elit`

        let rolls = ['administrator','editor','auditor','user']

        for(let u = 0; u<cantUsers;u++)
        {
            let names_index = this.generateRandomValueInRange(0,25)
            let rolls_index = this.generateRandomValueInRange(0,3)

            let newUser = new User(names[names_index],descriptions,rolls[rolls_index])
            this.addUser(newUser);

        }




    }

    generateRandomValueInRange(min, max) {
        return Math.round(min + Math.random() * (max - min));
    }


    async addUser(newUser){
        let userlist = await this.Database.getData("/users");
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