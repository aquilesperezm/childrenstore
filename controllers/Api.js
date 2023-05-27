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
                res.status(400).send("Error!! se requieren todos los campos");
            }

            //chequeamos si el usuario existe a nivel de base de datos
            db.buscarUsuario(nombre_usuario, (v) => {
                //en caso del que
                if (v != false)
                    return res.status(409).send("Error!!! El usuario ya existe. Autentiquese");
                 //crear el usuario
                else
                    console.log("Usurio no encontrado")
            })


            var encryptedPassword = await CryptEngine.hash(password, 10);

            db.adicionarUsuario()

            /*
                         // check if user already exist
                         // Validate if user exist in our database
                         const oldUser = await User.findOne({email});

                         if (oldUser) {
                             return res.status(409).send("Error!!! El usuario ya existe. Autentiquese");
                         }

                         //Encrypt user password
                         var encryptedPassword = await bcrypt.hash(password, 10);

                         // Create user in our database
                         const user = await User.create({
                             first_name,
                             last_name,
                             email: email.toLowerCase(), // sanitize: convert email to lowercase
                             password: encryptedPassword,
                         });

                         // Create token
                         const token = jwt.sign(
                             {user_id: user._id, email},
                             process.env.TOKEN_KEY,
                             {
                                 expiresIn: "30m",
                             }
                         );
                         // save user token
                         user.token = token;

                         // return new user
                         res.status(201).json(user);
             */
        } catch (err) {
            console.log(err);
        }
        // Our register logic ends here

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


    async loginUser(req, res) {

        try {
            // Get user input
            const {email, password} = req.body;

            // Validate user input
            if (!(email && password)) {
                res.status(400).send("Error!!! Se require email y password");
            }
            // Validate if user exist in our database
            const user = await User.findOne({email});

            if (user && (await bcrypt.compare(password, user.password))) {
                // Create token
                const token = jwt.sign(
                    {user_id: user._id, email},
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: "30m",
                    }
                );

                // save user token
                user.token = token;

                // user
                res.status(200).json(user);
            }
            res.status(400).send("Credenciales invalidas");

        } catch (err) {
            console.log(err);
        }
    }


}

module.exports = Api