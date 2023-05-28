//importamos json web tockens (jwt)
const jwt = require("jsonwebtoken")
const config = process.env
var CryptEngine = require('bcrypt')

const DB = require("./LocalDatabase");
var db = new DB('./database/database.json')

class Api {


    constructor() {
    }


    async registerUser(req, res) {
        // Our register logic starts here
        try {
            // Obtener todos los campos del json
            const {nombre_completo, nombre_usuario, rol, password} = req.body;

            // Validar la entrada de todos los nombres
            if (!(nombre_completo && nombre_usuario && rol && password)) {
                return res.status(400).send("Error!! se requieren todos los campos");
            }

            //chequeamos si el usuario existe a nivel de base de datos
            /* db.buscarUsuario(nombre_usuario, (v) => {
                 //en caso del que el usuario se encuentre lanzamos un error
                 if (v != false)
                     return res.status(409).send("Error!!! El usuario ya existe. Autentiquese");
             })*/

            const user = await db.buscarUsuario(nombre_usuario)
            if (user) return res.status(409).send("Error!!! El usuario ya existe. Autentiquese");
            else {

                //Creamos el usuario nuevo

                var encryptedPassword = await CryptEngine.hash(password, 10);

                // Crear token
                const token = jwt.sign(
                    {username: nombre_usuario, rol},
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: "30m",
                    }
                );

                db.adicionarUsuario(nombre_completo, nombre_usuario, rol, encryptedPassword, token)

                db.buscarUsuario(nombre_usuario, (user) => {
                    res.status(201).json(user);
                })
            }

        } catch (err) {
            console.log(err);
        }
        // Our register logic ends here

    }

    async loginUser(req, res) {

        try {
            // Get user input
            const {nombre_usuario, password} = req.body;

            // Validate user input
            if (!(nombre_usuario && password)) {
                res.status(400).send("Error!!! Se require nombre de usuario y password");
            }

            //chequeamos si el usuario existe a nivel de base de datos
            const user = await db.buscarUsuario(nombre_usuario)

            if (user && (await CryptEngine.compare(password, user._password))) {
                // Create token
                const token = jwt.sign(
                    {username: user._nombre_usuario, rol: user._rol},
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: "30m",
                    }
                );

                // save user token
                user._token = token;

                // user
                res.status(200).json(user);

            } else
                res.status(400).send("Credenciales invalidas");

        } catch (err) {
            console.log(err);
        }
    }

    verifyToken(req, res, next) {

        const token =
            req.body.token || req.query.token || req.headers["x-access-token"]

        if (!token) {
            return res.status(403).send("Un token es requerido para la autenticación")
        }
        try {
            const decoded = jwt.verify(token, config.TOKEN_KEY)
            req.user = decoded

        } catch (err) {
            return res.status(401).send("Token invalido")
        }
        return next()

    }

}

module.exports = Api