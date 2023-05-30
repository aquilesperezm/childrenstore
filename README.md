# Children Store
   Este repositorio contiene el código para la puesta en marcha de servicios web que siguen la arquitectura de Web Service RESTful, con la itencion de simular una
tienda para niñ@s. Esta aplicación posee una seguridad basada en [JWT](https://jwt.io/), donde cada usuario
posee un token y este es intercambiado entre el usuario y el sistema. Las tecnologias usadas son:
* Express (https://expressjs.com/)
* Node-Json-db (https://www.npmjs.com/package/node-json-db)
---
### Instalación

Para ello debemos tener instalado [NodeJs](https://nodejs.org/en), la carpeta del proyecto debe permitir 
la escritura, pues la base de datos es basada en JSON. Usando la instruccion:

    C:\<folder>\node App.js 
---
### Base de Datos
La base de datos de la aplicación es local, los datos se guardan en la carpeta "./database" y su gestión se realiza mediante el modulo <b>Node-Json-db</b>

---
### Variables de Entorno

La aplicacion posee un sistema de configuración mediante variables de entorno, en la raiz de la aplicación
se encuentra el fichero .env con la sintaxis para la configuracion: "KEY = VALUE" ,el cual tiene las siguientes opciones:

1. <span style="font-weight:bold">PORT</span> : Puerto de servicio para el servidor 
2. <span style="font-weight:bold">GENERATED_VALUE_ACTIVATED</span> : cuando su valor es TRUE se generan valores aleatorios en la BD.
3. <span style="font-weight:bold">COUNT_USER_GENERATED</span> : cantidad de usuarios a generar para la BD.
4. <span style="font-weight:bold">COUNT_PRODUCT_GENERATED</span> : cantidad de productos a generar para la BD.
5. <span style="font-weight:bold">TOKEN_KEY</span> : cadena usada para encriptar el token de los usuarios.
6. <span style="font-weight:bold">RULES</span> : Reglas para los usuarios con la estructura RULES.<ROL>.<ELEMENTO>, estas poseen los permisos <span style="color:lightblue">['CREATE','READ','UPDATE','DELETE','SELL']</span>.
---
### Servicios Web

Los servicios publicados por el protocolo HTTP, y a los cuales seran accedidos mediante el metodo POST, son los siguientes:
|   #   | URL               | Descripcion                                          |  Entrada      |  Salida        |
|:-----:|:-----------------:|:-----------------------------------------------------|:--------------|:---------------|
| 1     | <b>server:port</b>/register         | Registra los usuarios   | json: { nombre_completo, nombre_usuario, rol, password }  |   json: { user object }  |
| 2     | <b>server:port</b>/login            | Autentica al usuario y generar el token      | json: {nombre_usuario, password} | json: { user object } |
   | 3     | <b>server:port</b>/welcome          | Verfica si el usuario esta vigente    |  token | token |
   | 4     | <b>server:port</b>/create_product   | Crea un producto    |  json: { token, nombre, precio, cant_stock,categoria, tags, descripcion, info, valoracion, lista_imgs} | json: {producto object}
   | 5     | <b>server:port</b>/read_products   |  Lista todos los productos    |  json: { token } | json: [{producto object}, ...] 
| 6    | <b>server:port</b>/update_product   | Actualiza un producto    |  json: { token, sku, nombre, precio, cant_stock,categoria, tags, descripcion, info, valoracion, lista_imgs} | json: {producto object}
| 7     | <b>server:port</b>/delete_product   |  Borra un producto segun su sku (id)    |  json: { token, sku } | json {successfull}
| 8    | <b>server:port</b>/search_product   |  Busca un producto segun una o mas caracteristicas, en caso de no especificarlas, devolvera la lista completa    |  json: { token } | json: [Product1, Product2, ...]
| 9    | <b>server:port</b>/search_product_count   | Devuelve la cantida de productos, segun una busqueda por caracteristicas    |  json: { token } | json: {cantidad}
| 10    | <b>server:port</b>/sell_product_list   | Vende una lista de productos, que no pueden esta en la misma categoria    |  json: { token, list_products:[{sku:id, cant:n}...] } | json: {sucessfull}
| 11    | <b>server:port</b>/sold_products   | Muestra una lista de los productos vendidos   |  json: { token } | json: {lista:[Product1, Product2,....]}
| 12    | <b>server:port</b>/total_gain   | Calcula y Muestra las ganancias de los productos vendidos   |  json: { token } | json: {ganancia_total:n}
| 13    | <b>server:port</b>/show_products_nostock   | Muestra los productos que no tienen existencia en el almacén   |  json: { token } | json: {lista:[Producto1, Producto2,...]}
   
   
   
     
   

