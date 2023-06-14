'use strict'
const Database = require('./DataBase')

class ChildStore {

    Database

    constructor() {
         this.Database = new Database()
        this.Database.generateStorageData(5,5)

    }

    /** ------------------------------------------------- Requisitos Funcionales ------------------------------------ **/

    /**
     * @param Object with any fields and values
     * */
    getProductsByFields(Fields){


    }

    getCountProductsByFields(Fields){



    }

    /**--------------------------------------------------------------------------------------------------------------**/


}

module.exports = ChildStore