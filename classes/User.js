'use strict'
const safeid = require('generate-safe-id')
class User {

    iduser
    name
    description
    roll

    constructor(name, description, roll) {

        this.iduser = safeid().substring(0,10)
        this.name = name
        this.description = description
        this.roll = roll

    }

    getIdUser(){
        return this.iduser
    }

    getName() {
        return this.name
    }

    getDescription() {
        return this.description
    }

    getRoll() {
        return this.roll
    }

    setDescription(description) {
        this.description = description
    }

    setName(name) {
        this.name = name
    }

    setRoll(roll) {
        this.roll = roll
    }


}

module.exports = User