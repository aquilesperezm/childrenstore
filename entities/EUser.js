class EUser {

    _id=""
    _nombre_completo = ""
    _nombre_usuario = ""
    _rol = ""
    _password = ""

    constructor(id,nombrecompleto,usuario,rol,password) {
        this._id = id
        this._nombre_completo = nombrecompleto
        this._nombre_usuario = usuario
        this._rol = rol
        this._password = password
    }


    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get password() {
        return this._password;
    }

    set password(value) {
        this._password = value;
    }


    get nombre_completo() {
        return this._nombre_completo;
    }

    set nombre_completo(value) {
        this._nombre_completo = value;
    }

    get nombre_usuario() {
        return this._nombre_usuario;
    }

    set nombre_usuario(value) {
        this._nombre_usuario = value;
    }

    get rol() {
        return this._rol;
    }

    set rol(value) {
        this._rol = value;
    }

    get token() {
        return this._token;
    }

    set token(value) {
        this._token = value;
    }
}

module.exports = EUser