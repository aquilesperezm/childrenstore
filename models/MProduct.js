var EProduct = require('../entities/EProduct')
const shortid = require("shortid");
var IObject = require('../models/IObject')

class MProduct extends IObject {

    _DB

    constructor(Database_Ctrl) {
        super()
        this._DB = Database_Ctrl

    }

    //Implementacion de crud de productos
    /**
     * 1- Listar productos
     * 2- Buscar producto
     * 3- Adicionar producto
     * 4- Actualizar producto
     * 5- Eliminar producto
     * */

    static getAleatoryProducts(cantProducts) {
        //Generating Products

        if (cantProducts < 11) {

            var lista_productos = [
                new EProduct('Cuna', 45.65, 23, "Cuna", ['dormir', 'bebe'], "Cuna para bebes",
                    "", "", shortid.generate(), []),
                new EProduct('Monitor para bebes', 121.15, 17, "Monitor", ['dormir', 'bebe', 'vigilante', 'alarma'], "Monitor para bebes",
                    "", "", shortid.generate(), []),
                new EProduct('Asiento de seguridad', 53.78, 31, "Asiento", ['dormir', 'bebe', 'vigilante', 'alarma'], "Asiento de seguridad para autos",
                    "", "", shortid.generate(), []),
                new EProduct('Cambiador', 67.91, 13, "Asiento", ['dormir', 'bebe', 'higiene'], "Cambiador o mudador para bebes",
                    "", "", shortid.generate(), []),
                new EProduct('Bolso', 22.62, 98, "Bolso", ['dormir', 'bebe', 'higiene', 'almacen'], "Bolso cambiador para bebes",
                    "", "", shortid.generate(), []),
                new EProduct('Portabebes', 78.62, 44, "Bolso", ['dormir', 'bebe', 'higiene', 'almacen'], "Portabebes para el transporte",
                    "", "", shortid.generate(), []),
                new EProduct('Cochecito', 137.16, 54, "Vehiculo", ['dormir', 'bebe', 'Transporte'], "Coche para bebes",
                    "", "", shortid.generate(), []),
                new EProduct('Biberon', 5.31, 184, "Alimento", ['dormir', 'bebe', 'Transporte', 'Alimento'], "Biberon para bebes",
                    "", "", shortid.generate(), []),
                new EProduct('Silla brincadora', 145.53, 72, "Juego", ['bebe', 'Transporte', 'Alimento', 'Juego'], "Silla brincadora para entretenimiento",
                    "", "", shortid.generate(), []),
                new EProduct('Hamaca', 85.77, 10, "Juego", ['bebe', 'Transporte', 'Alimento', 'Juego'], "Hamaca para juegos",
                    "", "", shortid.generate(), []),
            ]

            var r = []
            for (var i = 0; i < cantProducts; i++)
                r.push(lista_productos[i])

            return r;

        } else throw "La cantidad de Productos a generar debe ser menor que 10"
    }

    //Listar Productos con paginacion
    async listProducts(paging_count = 0) {
        var lista = await this._DB.getDataFromPath('/products');
        if (paging_count > 0)
            return this._paginate(lista, paging_count)
        else
            return lista
    }

    //Buscar Producto por su nombre
    async searchProduct(productname) {
        var lista = await this.listProducts()

        var finded = lista.find((value) => {
            return value._nombre == productname
        })

        if (finded)
            return finded;
        else
            return false;
    }

    //Buscar Productos por Sku (ID)
    async searchProductByID(idSku) {
        var lista = await this.listProducts()

        var finded = lista.find((value) => {
            return value._sku === idSku
        })

        if (finded)
            return finded;
        else
            return false;
    }

    async searchProductsByFilters(filters, per_page) {

        var result = []

        const lista = await this.listProducts()

        if (filters.length > 0) {
            filters.forEach((filter) => {

                var fkey = Object.keys(filter)[0]
                var key = "_" + fkey

                /**
                 * Atributos comparados
                 *  1- nombre (String)
                 *  2- categoria (String)
                 *  3- descripcion (String)
                 *  4- informacion adicional (String)
                 *  5- valoracion (String)
                 *  6- precio (Number) Se buscaran los menores que el valor solicitado
                 *  7- cantidad en stock (Number) Se buscaran los menores que el valor solicitado
                 * */

                switch (key) {
                    case '_nombre': {
                        lista.forEach((e) => {
                            var valor_lista = e[key]
                            var valor_buscado = filter[fkey]
                            if (valor_lista.includes(valor_buscado)) {
                                result.push(e)
                            }
                        })
                        break
                    }
                    case '_categoria': {
                        lista.forEach((e) => {
                            var valor_lista = e[key]
                            var valor_buscado = filter[fkey]
                            if (valor_lista.includes(valor_buscado)) {
                                result.push(e)
                            }
                        })
                        break
                    }
                    case '_descripcion': {
                        lista.forEach((e) => {
                            var valor_lista = e[key]
                            var valor_buscado = filter[fkey]
                            if (valor_lista.includes(valor_buscado)) {
                                result.push(e)
                            }
                        })
                        break
                    }

                    case '_info_add': {
                        lista.forEach((e) => {
                            var valor_lista = e[key]
                            var valor_buscado = filter[fkey]
                            if (valor_lista.includes(valor_buscado)) {
                                result.push(e)
                            }
                        })
                        break
                    }

                    case '_valoracion': {
                        lista.forEach((e) => {
                            var valor_lista = e[key]
                            var valor_buscado = filter[fkey]
                            if (valor_lista.includes(valor_buscado)) {
                                result.push(e)
                            }
                        })
                        break
                    }

                    case '_precio': {
                        lista.forEach((e) => {
                            var valor_lista = e[key]
                            var valor_buscado = filter[fkey]
                            //Puede ser mayor que o menor que dependiendo del valor deseado
                            if (Number(valor_lista) <= Number(valor_buscado)) {
                                result.push(e)
                            }
                        })
                        break
                    }
                    case '_cant_stock': {
                        lista.forEach((e) => {
                            var valor_lista = e[key]
                            var valor_buscado = filter[fkey]
                            //Puede ser mayor que o menor que dependiendo del valor deseado
                            if (Number(valor_lista) <= Number(valor_buscado)) {
                                result.push(e)
                            }
                        })
                        break
                    }

                }

            })

            //console.log(Object.keys(filters[0]))

            return this.paginatorToObject(result, 1, 10);
        } else return this.paginatorToObject(lista, 1, per_page);
    }

    //Adicionar Producto
    async addProduct(nombre, precio, cant_stock, categoria, tags, descripcion, info, valoracion, lista_imagenes_asoc) {

        var product = new EProduct(nombre, precio, cant_stock, categoria, tags, descripcion, info, valoracion, shortid.generate(), lista_imagenes_asoc)

        var lista = await this._DB.getDataFromPath('/products');

        const index = lista.findIndex(object => {
            return object._nombre === nombre;
        });

        if (index == -1) {

            lista.push(product)
            this._DB.addData('/products', lista, true)

            return {successfull: true};

        } else return {successfull: false, cause: "El producto ya existe"}
    }

    //Actualizar Producto
    async updateProduct(sku, nombre, precio, cant_stock, categoria, tags, descripcion, info, valoracion, lista_imagenes_asoc) {
        //var lista = await this.listProducts()
        var lista = await this.listProducts();

        const index = lista.findIndex(object => {
            return object._sku == sku;
        });

        if (index > -1) {

            /*var producto = new EProduct(nombre, precio, cant_stock, categoria, tags, descripcion, info, valoracion, sku, lista_imagenes_asoc)

            lista.splice(index, 1)
            lista.push(producto)
            this._DB.addData('/products', lista)*/

            var producto = new EProduct(nombre, precio, cant_stock, categoria, tags, descripcion, info, valoracion, sku, lista_imagenes_asoc)

            lista.splice(index, 1)
            lista.push(producto)

            this._DB.addData('/products', lista)

            return {successfull: true}

        } else return {successfull: false, cause: "El producto no existe"}
    }

    //Eliminar producto
    async deleteProductType(idsku) {
        var lista = await this.listProducts();

        const index = lista.findIndex(object => {
            return object._sku === idsku;
        });

        if (index > -1) {
            lista.splice(index, 1)
            this._DB.addData('/products', lista)

            return {successfull: true}

        } else return {successfull: false, cause: "El producto no existe"}
    }

    async sellProducto(sku) {
        var lista = await this.listProducts();

        const index = lista.findIndex(object => {
            return object._sku === sku;
        });


    }

}

module.exports = MProduct