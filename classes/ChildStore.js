'use strict'
const Database = require('./DataBase'),
    env = require('dotenv').config(),
    var_enviroment = process.env

class ChildStore {

    Database

    constructor() {
        this.Database = new Database()
        if (var_enviroment.GENERATE_DATASTORE === "TRUE")
            this.Database.generateStorageData(5, 5)

    }

    /** ------------------------------------------------- Requisitos Funcionales ------------------------------------ **/

    /**
     * @param Object with any fields and values
     * */
    getProductsByFields(Fields) {

    }

    getCountProductsByFields(Fields) {


    }

    /**--------------------------------------------------------------------------------------------------------------**/


}

module.exports = ChildStore