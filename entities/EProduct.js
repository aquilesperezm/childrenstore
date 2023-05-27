class EProduct {

    _nombre = ""
    _precio = 0.00
    _cant_stock = 0
    _categoria = ""
    _tags = []
    _descripcion = ""
    _info_add = ""
    _valoracion = ""
    _sku = ""
    _imagenes_asociadas = []

    constructor(nombre, precio, cant_stock, categoria, tags, descripcion, info, valoracion, sku, lista_imagenes_asoc) {
        this._nombre = nombre
        this._precio = precio
        this._cant_stock = cant_stock
        this._categoria = categoria
        this._tags = tags
        this._descripcion = descripcion
        this._info_add = info
        this._valoracion = valoracion
        this._sku = sku
        this._imagenes_asociadas = lista_imagenes_asoc
    }

    add_imagenasociada(url) {
        this._imagenes_asociadas.push(url)
    }

    set imagenesList(v) {
        this._imagenes_asociadas = v
    }

    get imagenesList() {
        return this._imagenes_asociadas
    }

    get tags() {
        return this._tags;
    }

    set tags(value) {
        this._tags = value;
    }

    get nombre() {
        return this._nombre;
    }

    set nombre(value) {
        this._nombre = value;
    }

    get precio() {
        return this._precio;
    }

    set precio(value) {
        this._precio = value;
    }

    get cant_stock() {
        return this._cant_stock;
    }

    set cant_stock(value) {
        this._cant_stock = value;
    }

    get categoria() {
        return this._categoria;
    }

    set categoria(value) {
        this._categoria = value;
    }

    get descripcion() {
        return this._descripcion;
    }

    set descripcion(value) {
        this._descripcion = value;
    }

    get info_add() {
        return this._info_add;
    }

    set info_add(value) {
        this._info_add = value;
    }

    get valoracion() {
        return this._valoracion;
    }

    set valoracion(value) {
        this._valoracion = value;
    }

    get sku() {
        return this._sku;
    }

    set sku(value) {
        this._sku = value;
    }
}

module.exports = EProduct