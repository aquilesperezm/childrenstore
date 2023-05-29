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

        if (cantProducts < 12) {

            //Categorias: para chicas, para chicos, para bebes, para hogar, para juegos
            /*
            1- Chupetes. (Chupete)
            2- Alimentos. (Cereal)
            3- Pañales de tela y desechables. (Pañal Desechable)
            4- Ropa, incluyendo zapatos y calcetines. (Pillama)
            5- Mantas, toallas y accesorios para el baño. (Toalla)
            6- Productos para el cuidado íntimo del bebé. (Gel de Baño)
            7- Cunas. (Cuna)
            8- Cochecitos. (Coche)
            9- Sillas para el auto. (Carseat)
            10- Sacaleche. (Extractor de Leche Materna)
            11- Baberos. (Babero)
            12- Cangureras. (Cangurera)
            * */

            var lista_productos = [
                new EProduct('Chupete', 45.65, 23, "para bebes", ['bebe', 'chupete'], "Chupete para bebes de diferentes color",
                    "", "", shortid.generate(), []),
                new EProduct('Cereal', 121.15, 17, "para bebes", ['dormir', 'bebe', 'alimento'], "Alimento para bebes",
                    "", "", shortid.generate(), []),
                new EProduct('Pañal', 53.78, 31, "para bebes", ['dormir', 'bebe', 'higiene'], "Paquete de Pañales para bebes",
                    "", "", shortid.generate(), []),
                new EProduct('Muñeca', 67.91, 13, "para juegos", ['dormir', 'bebe', 'diversion'], "Pillama enterizo para bebes",
                    "", "", shortid.generate(), []),
                new EProduct('Tio vivo', 22.62, 98, "para juegos", ['bebe', 'diversion'], "Juguete para niños",
                    "", "", shortid.generate(), []),
                new EProduct('Gel de baño', 78.62, 44, "para bebes", ['bebe', 'higiene'], "Gel de baño con diferentes aromas",
                    "", "", shortid.generate(), []),
                new EProduct('Cuna', 137.16, 54, "para hogar", ['dormir', 'bebe', 'casa'], "Cuna para bebes",
                    "", "", shortid.generate(), []),
                new EProduct('Coche', 125.31, 184, "para chicos", ['chicos', 'transporte'], "Coche de color azul para chicos",
                    "", "", shortid.generate(), []),
                new EProduct('Carseat', 145.53, 72, "para chicas", ['chicos', 'transporte'], "Silla para el auto de color rosa",
                    "", "", shortid.generate(), []),
                new EProduct('Sacaleche', 85.77, 10, "para bebes", ['bebe', 'alimento', 'facilidad'], "Extractor de leche materna para bebes",
                    "", "", shortid.generate(), []),
                new EProduct('Babero', 25.77, 50, "para bebes", ['bebe', 'alimento', 'facilidad'], "Babero para facilitar la higiene del bebe",
                    "", "", shortid.generate(), []),
                new EProduct('Cangurera', 61.19, 40, "para bebes", ['bebe', 'alimento', 'transporte'], "Cangurera para facilitar el transporte del bebe",
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

    async sellProduct(sku, cant) {
        var lista = await this.listProducts();
        var lista_vendidos = await this._DB.getDataFromPath('/sales');

        const index = lista.findIndex(object => {
            return object._sku === sku;
        });

        var producto_vendido = lista[index];

        if (producto_vendido._cant_stock >= cant && producto_vendido._cant_stock != 0) {

            producto_vendido._cant_stock -= cant;
            producto_vendido._sales = cant;

            lista_vendidos.push(producto_vendido)

            this._DB.addData('/sales', lista_vendidos)
            this._DB.addData('/products', lista)

            return {
                sucessfull: true,
                sku: sku,
                cantidad: cant,
                cause: 'Producto vendido'
            }

        } else if (producto_vendido._cant_stock < cant && producto_vendido._cant_stock != 0) {

            producto_vendido._sales = producto_vendido._cant_stock
            producto_vendido._cant_stock = 0
            lista_vendidos.push(producto_vendido)

            this._DB.addData('/sales', lista_vendidos)
            this._DB.addData('/products', lista)

            return {
                sucessfull: true,
                sku: sku,
                cantidad_vendida:(cant - producto_vendido._sales),
                cause: 'Se vendieron ' + producto_vendido._sales + ' ,pero faltaron : ' + (cant - producto_vendido._sales) + ' Producto(s)'
            }

        } else return {
            sucessfull: false,
            sku: sku,
            cause: 'El producto requerido no fue vendido, por que no hay existencia'
        }


    }

}

module.exports = MProduct