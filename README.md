# Children Store
   Este repositorio contiene servicios web que siguen la arquitectura de Web Service RESTful, con la itencion de simular una
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
### Servicios

Los servicios publicados por el protocolo HTTP, y a los cuales seran accedidos mediante el metodo POST, son los siguientes:
|   #   | URL          | Descripcion                                          |  Entrada      |  Salida |
|:-----:|:------------:|:-----------------------------------------------------|:--------------|:--------|
| 1     | /register |  | Este servicio se encarga de registrar los usuarios   |               |         |
| 2     | centered     |      |
| 3     | are neat     |      |

