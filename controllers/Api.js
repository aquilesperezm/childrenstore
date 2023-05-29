//importamos json web tockens (jwt)
const jwt = require("jsonwebtoken")
const config_env = process.env

var CryptEngine = require('bcrypt')

const DBClass = require("./LocalDatabase");
var db = new DBClass('./database/database.json')

class Api {


    constructor() {
    }

    //API USER AUTH

    async registerUser(req, res) {
        // Our register logic starts here
        try {
            // Obtener todos los campos del json
            const {nombre_completo, nombre_usuario, rol, password} = req.body;

            // Validar la entrada de todos los nombres
            if (!(nombre_completo && nombre_usuario && rol && password)) {
                return res.status(400).send("Error!! se requieren todos los campos");
            }

            const user = await db.buscarUsuario(nombre_usuario)
            if (user) return res.status(409).send("Error!!! El usuario ya existe. Autentiquese");
            else {

                //Creamos el usuario nuevo

                var encryptedPassword = await CryptEngine.hash(password, 10);

                // Crear token
                const token = jwt.sign(
                    {username: nombre_usuario, rol: rol},
                    config_env.TOKEN_KEY,
                    {
                        expiresIn: "30m",
                    }
                );

                db.adicionarUsuario(nombre_completo, nombre_usuario, rol.toUpperCase(), encryptedPassword, token)

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
                    config_env.TOKEN_KEY,
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

    welcomeUser(req, res) {
        res.status(200).send("Welcome 🙌 ");
    }

    verifyToken(req, res, next) {

        const token =
            req.body.token || req.query.token || req.headers["x-access-token"]

        if (!token) {
            return res.status(403).send("Un token es requerido para la autenticación")
        }
        try {
            const decoded = jwt.verify(token, config_env.TOKEN_KEY)
            req.user = decoded

        } catch (err) {
            return res.status(401).send("Token invalido")
        }
        return next()

    }

    //CRUD PRODUCTOS

    async createProduct(req, res) {

        const {
            nombre,
            precio,
            cant_stock,
            categoria,
            tags,
            descripcion,
            info,
            valoracion,
            lista_imgs,

            token
        } = req.body;

        // Validar la entrada de todos los nombres
        if (!(nombre &&
            precio &&
            cant_stock &&
            categoria &&
            tags &&
            descripcion &&
            info &&
            valoracion &&
            lista_imgs,
                token
        )) {
            return res.status(400).send("Error!! se requieren todos los campos");
        }

        //Buscamos el usuario al que pertenece el token y establecemos los permisos
        var session_user = await db.buscarUsuarioPorToken(token)


        if (session_user) {

            var rule = 'RULES.' + session_user._rol + '.PRODUCT'
            DBClass._DETECTED_ROL = eval(config_env[rule])

            var r = await db.adicionarProducto(nombre, precio, cant_stock, categoria,
                tags, descripcion, info, valoracion, lista_imgs)

            if (!r.successfull)
                return res.status(401).send(r)
            else res.status(200).send(r)

        } else {
            return res.status(401).send({successfull: false, cause: 'Token invalido'})
        }
        // DBClass._DETECTED_ROL = ''

    }

    async listAllProducts(req, res) {
        const {
            token
        } = req.body;

        //Buscamos el usuario al que pertenece el token y establecemos los permisos
        var session_user = await db.buscarUsuarioPorToken(token)

        if (session_user) {

            var rule = 'RULES.' + session_user._rol + '.PRODUCT'
            DBClass._DETECTED_ROL = eval(config_env[rule])

            var lista = await db.listarProductos()

            res.status(200).send({successfull: true, data: lista})


        } else {
            return res.status(401).send({successfull: false, cause: 'Token invalido'})
        }

    }

    async updateProduct(req, res) {

        const {
            token,
            idsku,
            nombre,
            precio,
            cant_stock,
            categoria,
            tags,
            descripcion,
            info,
            valoracion,
            lista_imgs
        } = req.body;

        // Validar la entrada de todos los nombres
        if (!(
            token &&
            idsku &&
            nombre &&
            precio &&
            cant_stock &&
            categoria &&
            tags &&
            descripcion &&
            info &&
            valoracion &&
            lista_imgs
        )) {
            return res.status(400).send("Error!! se requieren todos los campos");
        }

        //Buscamos el usuario al que pertenece el token y establecemos los permisos
        var session_user = await db.buscarUsuarioPorToken(token)


        if (session_user) {

            var rule = 'RULES.' + session_user._rol + '.PRODUCT'
            DBClass._DETECTED_ROL = eval(config_env[rule])

            var r = await db.actualizarProducto(idsku, nombre, precio, cant_stock, categoria,
                tags, descripcion, info, valoracion, lista_imgs)

            if (!r.successfull)
                return res.status(401).send(r)
            else res.status(200).send(r)

        } else {
            return res.status(401).send({successfull: false, cause: 'Token invalido'})
        }
        // DBClass._DETECTED_ROL = ''

    }

    async deleteProduct(req, res) {
        const {
            token,
            idsku
        } = req.body;

        // Validar la entrada de todos los nombres
        if (!(
            token &&
            idsku
        )) {
            return res.status(400).send("Error!! se requieren todos los campos");
        }

        //Buscamos el usuario al que pertenece el token y establecemos los permisos
        var session_user = await db.buscarUsuarioPorToken(token)

        if (session_user) {

            var rule = 'RULES.' + session_user._rol + '.PRODUCT'
            DBClass._DETECTED_ROL = eval(config_env[rule])

            var r = await db.eliminarProducto(idsku)

            if (!r.successfull)
                return res.status(401).send(r)
            else res.status(200).send(r)

        } else {
            return res.status(401).send({successfull: false, cause: 'Token invalido'})
        }
        // DBClass._DETECTED_ROL = ''
    }

    //CUSTOM API REST - PRODUCTOS

    async buscarProducto(req, res) {

        try {

            const {filters, per_page} = req.body;

            const result = await db.buscarProductoPorFiltros(filters, per_page)

            res.status(200).json(result);

        } catch (err) {
            console.log(err)
        }

    }

    async buscarProductoCantidad(req, res) {

        try {

            const {filters, per_page} = req.body;

            const result = await db.buscarProductoPorFiltros(filters, per_page)

            res.status(200).json({cantidad: result.total});

        } catch (err) {
            console.log(err)
        }

    }

    async sellProductList(req, res) {
        const {
            token,
            list_products
        } = req.body;

        // Validar la entrada de todos los nombres
        if (!(
            token &&
            list_products
        )) {
            return res.status(400).send("Error!! se requieren todos los campos");
        }

        //Buscamos el usuario al que pertenece el token y establecemos los permisos
        var session_user = await db.buscarUsuarioPorToken(token)

        if (session_user) {

            var rule = 'RULES.' + session_user._rol + '.PRODUCT'
            DBClass._DETECTED_ROL = eval(config_env[rule])

            /*
            *  Lista de productos Ejemplo:
            *     [{sku='id1',cant=2},{sku='id2',cant=5}]
            *
            * */

            var respuesta = await db.venderListaProductos(list_products)
            return res.status(200).send(respuesta)

        } else return res.status(401).send({successfull: false, cause: 'Token invalido'})

    }

    async soldProducts(req, res) {
        const {
            token
        } = req.body;

        // Validar la entrada de todos los nombres
        if (!(
            token
        )) {
            return res.status(400).send("Error!! se requieren todos los campos");
        }

        //Buscamos el usuario al que pertenece el token y establecemos los permisos
        var session_user = await db.buscarUsuarioPorToken(token)

        if (session_user) {

            var rule = 'RULES.' + session_user._rol + '.PRODUCT'
            DBClass._DETECTED_ROL = eval(config_env[rule])

            var result = await db.buscarProductosVendidos()
            return res.status(200).send(result)

        } else return res.status(401).send({successfull: false, cause: 'Token invalido'})


    }


    async totalGain(req, res) {
        const {
            token
        } = req.body;

        // Validar la entrada de todos los nombres
        if (!(
            token
        )) {
            return res.status(400).send("Error!! se requieren todos los campos");
        }

        //Buscamos el usuario al que pertenece el token y establecemos los permisos
        var session_user = await db.buscarUsuarioPorToken(token)

        if (session_user) {

            var rule = 'RULES.' + session_user._rol + '.PRODUCT'
            DBClass._DETECTED_ROL = eval(config_env[rule])

            var result = await db.buscarProductosVendidos()

            var ganancia = 0.00
            result.forEach((sold)=>{
                ganancia += sold._precio * sold._sales
            })

            return res.status(200).send({ganancia_total:ganancia.toFixed(2)})

        } else return res.status(401).send({successfull: false, cause: 'Token invalido'})


    }

    async noStockProducts(req,res){

        const {
            token
        } = req.body;

        // Validar la entrada de todos los nombres
        if (!(
            token
        )) {
            return res.status(400).send("Error!! se requieren todos los campos");
        }

        //Buscamos el usuario al que pertenece el token y establecemos los permisos
        var session_user = await db.buscarUsuarioPorToken(token)

        if (session_user) {

            var rule = 'RULES.' + session_user._rol + '.PRODUCT'
            DBClass._DETECTED_ROL = eval(config_env[rule])

            var lista = await db.listarProductosNoStock()

            return res.status(200).send({ prods_nostock:lista})

        } else return res.status(401).send({successfull: false, cause: 'Token invalido'})

    }

}//end class

module.exports = Api