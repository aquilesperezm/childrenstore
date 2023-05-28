const shortid = require("shortid");
var EUser = require('../entities/EUser')
var IObject = require('../models/IObject')

var CryptEngine = require('bcrypt')

class MUser extends IObject {

    //Implementacion de crud de usuarios
    /**
     * 1- Listar usuarios
     * 2- Buscar usuario
     * 3- Adicionar usuario
     * 4- Actualizar usuario
     * 5- Eliminar usuario
     * */

    _DB

    constructor(Database_Ctrl) {
        super()
        this._DB = Database_Ctrl
    }

    static async getAleatoryUsers(cantUser) {

        //Generating Users
       if(cantUser < 12) {
           var full_names = ['Skyler Sullivan', 'Zachary Horn', 'Arianna Conrad', 'Amanda Mcgrath',
               'Paris Soto', 'Allan Wilkinson', 'Dillan Montoya', 'Parker Sherman',
               'Brent Shields', 'Dominique Paul', 'Max Buckley', 'Frida Coleman']

           var login_user = ['skyler', 'zachary', 'arianna', 'amanda', 'paris',
               'allan', 'dillan', 'parker', 'brent', 'dominique',
               'max', 'frida']

           var rols = ['ADMINISTRATOR', 'EDITOR', 'OWNER', 'OPERATOR', 'USER']


           var rol_cursor = 0
           var list_users = []
           for (var i = 0; i < cantUser; i++) {


               var n_index = this.prototype.getRandomInt(0, 12),
                   n_rols = this.prototype.getRandomInt(0, 4)

               if (rol_cursor == 5) rol_cursor = 0

               var pass = await CryptEngine.hash("P@ssw0rd1**",10);
               var newUser = new EUser(shortid.generate(), full_names[n_index], login_user[n_index], rols[rol_cursor++], pass )

               if (!this.prototype.noRepeatDataUsers(list_users, login_user[n_index]))
                   list_users.push(newUser)
               else i--

           }

           return list_users
       } else throw "La cantidad de usuarios a generar debe ser menor que 12"

    }


    //Listar usuarios
    async listAllUsers(paging_count = 0) {
        var lista = await this._DB.getDataFromPath('/users');
        if (paging_count > 0)
            return this.prototype.paginate(lista, paging_count)
        else
            return lista
    }

    //Buscar usuario
    async searchUser(nickname) {
        var lista = await this.listAllUsers()

        var finded = lista.find((value) => {
            return value._nombre_usuario == nickname
        })

        if (finded)
            return finded;
        else
            return false;
    }

    async buscarUsuarioPorID(idUsuario) {
        var lista = await this.listAllUsers()

        var finded = lista.find((value) => {
            return value._id === idUsuario
        })

        if (finded)
            return finded;
        else
            return false;
    }

    async searchUserByToken(token) {
        var lista = await this.listAllUsers()

        var finded = lista.find((value) => {
            return value._token === token
        })

        if (finded)
            return finded;
        else
            return false;
    }

    //Adicionar Usuario
    async addUsuario(nombreCompleto, nombreUsuario, rol, password, token) {

        var newUser = new EUser(shortid.generate(), nombreCompleto, nombreUsuario, rol, password, token)

        var lista = await this._DB.getDataFromPath('/users');

        const index = lista.findIndex(object => {
            return object._nombre_usuario === nombreUsuario;
        });

        if (index == -1) {
            lista.push(newUser)
            this._DB.addData('/users', lista, true)
        } else throw "El usuario ya existe"
    }

    //Actualizar Usuario
    async updateUsuario(idUsuario, nombre_completo, username, rol, password) {
        var lista = await this.listAllUsers();

        var tmp_usuario = new EUser(idUsuario, nombre_completo, username, rol, password)

        const index = lista.findIndex(object => {
            return object._id === idUsuario;
        });

        lista.splice(index, 1)
        lista.push(tmp_usuario)

        this._DB.addData('/users', lista)

    }

    //Eliminar usuario
    async deleteUsuario(idUsuario) {
        var lista = await this.listAllUsers();

        const index = lista.findIndex(object => {
            return object._id === idUsuario;
        });

        lista.splice(index, 1)

        this._DB.addData('/users', lista)

    }

}

module.exports = MUser