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

var User = require('../models/MUser'),
    Product = require('../models/MProduct')

var shortid = require('shortid');


class LocalDatabase {

    constructor(databaseFilePath) {

        this.databaseFilePath = databaseFilePath
        this.db = new JsonDB(new Config(databaseFilePath, true, true, '/'))

    }

    generateDataExample(cantUser, cantProducts) {

        //Generating Users

        var full_names = ['Skyler Sullivan', 'Zachary Horn', 'Arianna Conrad', 'Amanda Mcgrath',
            'Paris Soto', 'Allan Wilkinson', 'Dillan Montoya', 'Parker Sherman',
            'Brent Shields', 'Dominique Paul', 'Max Buckley', 'Frida Coleman']

        var login_user = ['skyler', 'zachary', 'arianna', 'amanda', 'paris',
            'allan', 'dillan', 'parker', 'brent', 'dominique',
            'max', 'frida']

        var rols = ['Administrator', 'Editor', 'Owner', 'Operator', 'User']


        var rol_cursor = 0
        var list_users = []
        for (var i = 0; i < cantUser; i++) {

            var n_index = this._getRandomInt(0, 12),
                n_rols = this._getRandomInt(0, 4)

            if (rol_cursor == 5) rol_cursor = 0

            var u = new User(shortid.generate(), full_names[n_index], login_user[n_index], rols[rol_cursor++], "P@ssw0rd1**")

            if (!this._noRepeatDataUsers(list_users, login_user[n_index]))
                list_users.push(u)
            else i--


        }

        this.addData('/users', list_users)

        //Generating Products

        var lista_nombre_productos = ['Cuna', 'Monitor para bebes', 'Asiento de seguridad para autos', 'Cambiador o mudador',
            'Bolso cambiador', 'Portabebes', 'Cochecito', 'Biberon', 'Silla brincadora', 'Hamaca para bebes',
            'Bañera', 'Termometro'
        ]

        var lista_productos = [
            {
                type: 'MProduct',
                json: new Product('Cuna', 45.65, 23, "Cuna", ['dormir', 'bebe'], "Cuna para bebes",
                    "", "", shortid.generate(), []),
                index: 1
            },
            {
                type: 'MProduct',
                json: new Product('Monitor para bebes', 121.15, 17, "Monitor", ['dormir', 'bebe', 'vigilante', 'alarma'], "Monitor para bebes",
                    "", "", shortid.generate(), []),
                index: 2
            },
            {
                type: 'MProduct',
                json: new Product('Asiento de seguridad', 53.78, 31, "Asiento", ['dormir', 'bebe', 'vigilante', 'alarma'], "Asiento de seguridad para autos",
                    "", "", shortid.generate(), []),
                index: 3
            },
            {
                type: 'MProduct',
                json: new Product('Cambiador', 67.91, 13, "Asiento", ['dormir', 'bebe', 'higiene'], "Cambiador o mudador para bebes",
                    "", "", shortid.generate(), []),
                index: 4
            },
            {
                type: 'MProduct',
                json: new Product('Bolso', 22.62, 98, "Bolso", ['dormir', 'bebe', 'higiene', 'almacen'], "Bolso cambiador para bebes",
                    "", "", shortid.generate(), []),
                index: 5
            },
            {
                type: 'MProduct',
                json: new Product('Portabebes', 78.62, 44, "Bolso", ['dormir', 'bebe', 'higiene', 'almacen'], "Portabebes para el transporte",
                    "", "", shortid.generate(), []),
                index: 6
            },
            {
                type: 'MProduct',
                json: new Product('Cochecito', 137.16, 54, "Vehiculo", ['dormir', 'bebe', 'Transporte'], "Coche para bebes",
                    "", "", shortid.generate(), []),
                index: 7
            },
            {
                type: 'MProduct',
                json: new Product('Biberon', 5.31, 184, "Alimento", ['dormir', 'bebe', 'Transporte', 'Alimento'], "Biberon para bebes",
                    "", "", shortid.generate(), []),
                index: 8
            },
            {
                type: 'MProduct',
                json: new Product('Silla brincadora', 145.53, 72, "Juego", ['bebe', 'Transporte', 'Alimento', 'Juego'], "Silla brincadora para entretenimiento",
                    "", "", shortid.generate(), []),
                index: 9
            },
            {
                type: 'MProduct',
                json: new Product('Hamaca', 85.77, 10, "Juego", ['bebe', 'Transporte', 'Alimento', 'Juego'], "Silla brincadora para entretenimiento",
                    "", "", shortid.generate(), []),
                index: 10
            }
        ]

        this.addData('/products', lista_productos)

    }

    addData(path, data) {
        this.db.push(path, data);

    }

    async getDataFromPath(path) {
        const result = await this.db.getData(path)
        return result
    }

    _getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
    }

    _noRepeatDataUsers(targetList, valueToFind) {
        return targetList.find((value) => {
            return value.nombre_usuario == valueToFind
        })
    }

    _paginate(arr, size) {
        return arr.reduce((acc, val, i) => {
            let idx = Math.floor(i / size)
            let page = acc[idx] || (acc[idx] = [])
            page.push(val)

            return acc
        }, [])
    }

    //Implementacion de crud de usuarios
    /**
     * 1- Listar usuarios
     * 2- Buscar usuario
     * 3- Adicionar usuario
     * 4- Actualizar usuario
     * 5- Eliminar usuario
     * */

    //Listar usuarios
    async listarUsuarios(paging_count = 0) {
        var lista = await this.getDataFromPath('/users');
        if (paging_count > 0)
            return this._paginate(lista, paging_count)
        else
            return lista
    }

    //Buscar usuario
    async buscarUsuario(nickname) {
        var lista = await this.listarUsuarios()

        var finded = lista.find((value) => {
            return value.nombre_usuario == nickname
        })

        if (finded)
            return finded;
        else
            return false;
    }

    async buscarUsuarioPorID(idUsuario) {
        var lista = await this.listarUsuarios()

        var finded = lista.find((value) => {
            return value._id === idUsuario
        })

        if (finded)
            return finded;
        else
            return false;
    }

    //Adicionar Usuario
    async adicionarUsuario(nombreCompleto, nombreUsuario, rol, password) {
        var u = new User(shortid.generate(), nombreCompleto, nombreUsuario, rol, password)
        var lista = await this.getDataFromPath('/users');

        const index = lista.findIndex(object => {
            return object._nombre_usuario === nombreUsuario;
        });

        if (index == -1) {
            lista.push(u)
            this.addData('/users', lista, true)
        } else throw "El usuario ya existe"
    }

    //Actualizar Usuario
    async actualizarUsuario(idUsuario, nombre_completo, username, rol, password) {
        var lista = await this.listarUsuarios();

        var usuario = new User(idUsuario, nombre_completo, username, rol, password)

        const index = lista.findIndex(object => {
            return object._id === idUsuario;
        });

        lista.splice(index, 1)
        lista.push(usuario)

        this.addData('/users', lista)

    }

    //Eliminar usuario
    async eliminarUsuario(idUsuario) {
        var lista = await this.listarUsuarios();

        const index = lista.findIndex(object => {
            return object._id === idUsuario;
        });

        lista.splice(index, 1)

        this.addData('/users', lista)

    }

}

module.exports = LocalDatabase