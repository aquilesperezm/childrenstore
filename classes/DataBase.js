'use strict'

const User = require("./User"),
      Product = require("./Product"),
      ConfigDB = require('node-json-db').Config,
      JsonDB = require('node-json-db').JsonDB

class DataBase {

    database

    constructor() {
        this.database = new JsonDB(new ConfigDB('database/storage.db', true, true, '/'));
    }


    generateStorageData(cantUsers, cantProducts) {

        this.database.push('/users', [])
        this.database.push('/products', [])

        //generate the users

        let names = ['Adams', 'Baker', 'Clark', 'Davis', 'Evans', 'Frank', 'Ghosh', 'Hills', 'Irwin', 'Jones',
            'Klein', 'Lopez', 'Mason', 'Nalty', 'Ochoa', 'Patel', 'Quinn', 'Reily', 'Smith', 'Trott',
            'Usman', 'Valdo', 'White', 'Xiang', 'Yakub', 'Zafar']

        let descriptions = `Lorem ipsum dolor sit amet, consectetur adipiscing elit`

        let rolls = ['administrator', 'editor', 'auditor', 'user']

        for (let u = 0; u < cantUsers; u++) {
            let names_index = this.__generateRandomValueInRange(0, 25)
            let rolls_index = this.__generateRandomValueInRange(0, 3)

            let newUser = new User(names[names_index], descriptions, rolls[rolls_index])
            this.addUser(newUser);

        }

        //generate the products
        var lista_productos = [
            new Product('Chupete', 45.65, 23, "para bebes", ['bebe', 'chupete'], "Chupete para bebes de diferentes color",
                "", "", []),
            new Product('Cereal', 121.15, 17, "para bebes", ['dormir', 'bebe', 'alimento'], "Alimento para bebes",
                "", "", []),
            new Product('Pañal', 53.78, 31, "para bebes", ['dormir', 'bebe', 'higiene'], "Paquete de Pañales para bebes",
                "", "", []),
            new Product('Muñeca', 67.91, 13, "para juegos", ['dormir', 'bebe', 'diversion'], "Pillama enterizo para bebes",
                "", "", []),
            new Product('Tio vivo', 22.62, 98, "para juegos", ['bebe', 'diversion'], "Juguete para niños",
                "", "", []),
            new Product('Gel de baño', 78.62, 44, "para bebes", ['bebe', 'higiene'], "Gel de baño con diferentes aromas",
                "", "", []),
            new Product('Cuna', 137.16, 54, "para hogar", ['dormir', 'bebe', 'casa'], "Cuna para bebes",
                "", "", []),
            new Product('Coche', 125.31, 184, "para chicos", ['chicos', 'transporte'], "Coche de color azul para chicos",
                "", "", []),
            new Product('Carseat', 145.53, 72, "para chicas", ['chicos', 'transporte'], "Silla para el auto de color rosa",
                "", "", []),
            new Product('Sacaleche', 85.77, 10, "para bebes", ['bebe', 'alimento', 'facilidad'], "Extractor de leche materna para bebes",
                "", "", []),
            new Product('Babero', 25.77, 50, "para bebes", ['bebe', 'alimento', 'facilidad'], "Babero para facilitar la higiene del bebe",
                "", "", []),
            new Product('Cangurera', 61.19, 40, "para bebes", ['bebe', 'alimento', 'transporte'], "Cangurera para facilitar el transporte del bebe",
                "", "", []),
        ]

        lista_productos.forEach((v, i, a) => {
            this.addProduct(v)
        })

    }

    __generateRandomValueInRange(min, max) {
        return Math.round(min + Math.random() * (max - min));
    }

    /** ----------------------------------------------- CRUD USERS --------------------------------------------------**/
    /**
     * @description (Create - CRUD) Create a new User
     * @param newUser new User Object
     * */
    async addUser(newUser) {
        let userlist = await this.database.getData("/users");
        userlist.push(newUser)
        await this.database.push('/users', userlist)
    }

    /**
     * @description (Read - CRUD) Get a User List
     * */
    async getUsers() {
        return await this.database.getData('/users')
    }

    /**
     * @description (Update - CRUD) Update a User by idUser
     * @param idUser (number)
     * @param newUser (User Object)
     *
     * */
    async updateUser(idUser, newUser) {
        let userlist = await this.database.getData("/users");
        userlist.forEach((v,i,a)=>{


            let indexOldUser = -1;
            if(v.iduser == idUser)
            {
                newUser.iduser = idUser
                userlist[i] = newUser
                this.database.push('/users',userlist)

            }

        })

    }

    /**
     * @description Delete User by idUser
     * @param idUser a string representing of id
     * */
    async deleteUser(idUser){
        let userlist = await this.database.getData("/users");

        userlist.forEach((v,i,a)=>{

            let indexOldUser = -1;
            if(v.iduser == idUser)
            {
                userlist.splice(i,1)
                this.database.push('/users',userlist)

            }

        })
    }

    /**------------------------------------- END CRUD USERS -------------------------------------------------------- **/

    /** --------------------------------------------  CRUD PRODUCTS ------------------------------------------------- **/
    async addProduct(newProduct) {
        let productList = await this.database.getData('/products')
        productList.push(newProduct)
        await this.database.push('/products', productList)

    }

    /**------------------------------------------ END CRUD PRODUCTS ------------------------------------------------**/


}

module.exports = DataBase