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

    static getAleatoryProducts() {
        //Generating Products

        var lista_productos = [
            {
                type: 'MProduct',
                json: new EProduct('Cuna', 45.65, 23, "Cuna", ['dormir', 'bebe'], "Cuna para bebes",
                    "", "", shortid.generate(), []),
                index: 1
            },
            {
                type: 'MProduct',
                json: new EProduct('Monitor para bebes', 121.15, 17, "Monitor", ['dormir', 'bebe', 'vigilante', 'alarma'], "Monitor para bebes",
                    "", "", shortid.generate(), []),
                index: 2
            },
            {
                type: 'MProduct',
                json: new EProduct('Asiento de seguridad', 53.78, 31, "Asiento", ['dormir', 'bebe', 'vigilante', 'alarma'], "Asiento de seguridad para autos",
                    "", "", shortid.generate(), []),
                index: 3
            },
            {
                type: 'MProduct',
                json: new EProduct('Cambiador', 67.91, 13, "Asiento", ['dormir', 'bebe', 'higiene'], "Cambiador o mudador para bebes",
                    "", "", shortid.generate(), []),
                index: 4
            },
            {
                type: 'MProduct',
                json: new EProduct('Bolso', 22.62, 98, "Bolso", ['dormir', 'bebe', 'higiene', 'almacen'], "Bolso cambiador para bebes",
                    "", "", shortid.generate(), []),
                index: 5
            },
            {
                type: 'MProduct',
                json: new EProduct('Portabebes', 78.62, 44, "Bolso", ['dormir', 'bebe', 'higiene', 'almacen'], "Portabebes para el transporte",
                    "", "", shortid.generate(), []),
                index: 6
            },
            {
                type: 'MProduct',
                json: new EProduct('Cochecito', 137.16, 54, "Vehiculo", ['dormir', 'bebe', 'Transporte'], "Coche para bebes",
                    "", "", shortid.generate(), []),
                index: 7
            },
            {
                type: 'MProduct',
                json: new EProduct('Biberon', 5.31, 184, "Alimento", ['dormir', 'bebe', 'Transporte', 'Alimento'], "Biberon para bebes",
                    "", "", shortid.generate(), []),
                index: 8
            },
            {
                type: 'MProduct',
                json: new EProduct('Silla brincadora', 145.53, 72, "Juego", ['bebe', 'Transporte', 'Alimento', 'Juego'], "Silla brincadora para entretenimiento",
                    "", "", shortid.generate(), []),
                index: 9
            },
            {
                type: 'MProduct',
                json: new EProduct('Hamaca', 85.77, 10, "Juego", ['bebe', 'Transporte', 'Alimento', 'Juego'], "Silla brincadora para entretenimiento",
                    "", "", shortid.generate(), []),
                index: 10
            }
        ]

        return lista_productos;

    }

    //Listar Productos con paginacion
    async listarProductos(paging_count = 0) {
        var lista = await this.getDataFromPath('/products');
        if (paging_count > 0)
            return this._paginate(lista, paging_count)
        else
            return lista
    }

    //Buscar Producto por su nombre
    async buscarProducto(productname) {
        var lista = await this.listarProductos()

        var finded = lista.find((value) => {
            return value.nombre == productname
        })

        if (finded)
            return finded;
        else
            return false;
    }

    //Buscar Productos por Sku (ID)
    async buscarUsuarioPorID(idSku) {
        var lista = await this.listarProdutos()

        var finded = lista.find((value) => {
            return value._sku === idSku
        })

        if (finded)
            return finded;
        else
            return false;
    }

    //Adicionar Producto
    async adicionarProducto(nombre, precio, cant_stock, categoria, tags, descripcion, info, valoracion, lista_imagenes_asoc) {

        var product = new Product(nombre, precio, cant_stock, categoria, tags, descripcion, info, valoracion, shortid.generate(), lista_imagenes_asoc)

        var lista = await this.getDataFromPath('/products');

        const index = lista.findIndex(object => {
            return object._nombre === nombre;
        });

        if (index == -1) {
            lista.push(product)
            this.addData('/products', lista, true)

        } else throw "El producto ya existe"
    }

    //Actualizar Producto
    async actualizarProducto(sku, nombre, precio, cant_stock, categoria, tags, descripcion, info, valoracion, lista_imagenes_asoc) {
        var lista = await this.listarProductos()

        var producto = new Product(nombre, precio, cant_stock, categoria, tags, descripcion, info, valoracion, sku, lista_imagenes_asoc)

        const index = lista.findIndex(object => {
            return object._sku === sku;
        });

        lista.splice(index, 1)
        lista.push(producto)

        this.addData('/products', lista)

    }

    //Eliminar producto
    async eliminarProducto(sku) {
        var lista = await this.listarProductos();

        const index = lista.findIndex(object => {
            return object._sku === sku;
        });

        lista.splice(index, 1)

        this.addData('/products', lista)

    }

}

module.exports = MProduct