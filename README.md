# Juego de Tres en Línea o Triqui

Este proyecto fue elaborado para una prueba de conocimientos en desarrollo de software aplicando las siguientes tecnologías:

- Backend: Node.js
- Frontend: Vue.js
- Database: Postgres

Para facilitar la conexión con la base de datos implementé un ORM para Node.js llamado Sequelize.

## Comenzando

Lo primero que debes hacer es descargar el codigo del repositorio haciendo uso de los comandos de clonación de Git con la siguiente URL:

`https://github.com/alejocarvas/PruebaTalenta365.git`

Una vez descargues el proyecto, podrás observar 2 carpetas con los siguientes nombre:

- three_inline_backend
- three_inline_frontend

### Pre-requisitos :fa-wrench:

- Deberás tener instalado o instalar PostgreSQL para poder crear la base de datos. Si no sabes cómo isntalarlo revisa el siguiente link: [Cómo instalar PostgreSQL](http://https://www.locurainformaticadigital.com/2018/09/08/descargar-e-instalar-postgresql-en-windows/ 'Cómo instalar PostgreSQL')
- Tener instalado o instalar Node.js. Si no sabes cómo isntalarlo revisa el siguiente link: [Cómo instalar Node.js](http://https://www.ecodeup.com/como-instalar-node-js-y-su-gestor-de-paquetes-npm-en-windows/ 'Cómo instalar Node.js')
- Tener instalado o instalar Vue.js. Si no sabes cómo isntalarlo revisa el siguiente link: [Cómo instalar Vue.js](http://https://es.vuejs.org/v2/guide/installation.html 'Cómo instalar Vue.js')

### Instalación :fa-cloud-download:

Para poder ejecutar el proyecto, deberás instalar todas las dependencias necesarias para cada proyecto, tanto el backend como el frontend. Yo usé para el desarrollo Visual Studio Code y realizaré las instrucciones en dicho editor.

Lo primero que debes hacer es abrir una terminal para poder ejecutar el siguiente código.

- Dirigite a la carpeta del proyecto backend, para esto deberás escribir el siguiente código en la terminal:

`cd three_inline_backend`

- Una vez en la carpeta del proyecto del backend deberás ejecutar la siguiente línea:

`npm install`

Esto permitirá instalar todas las dependencias que necesita el proyecto.

- Ahora puedes ejecutar el proyecto del backend si no presentó ningún error la instalación de las dependencias:

`npm start`

- Crea otra terminal para el proyecto del frontend.
- Ahora ingresar a la carpeta del proyecto del frontend de la siguiente forma:

`cd three_inline_frontend`

- Instalar las extensiones del proyecto del frontend:

`npm install`

- Ahora si no se presentaron errores podrás ejecutar el proyecto del frontend.

## Configuración :fa-cog:

Para poder configurar la base de datos deberás ir al proyecto del backend y buscar el archivo de nombre

> database.js

que se encuentra en la carpeta config.

Allí deberás modificar la cadena de conexión donde deberás establecer el nombre de la base de datos, el usuario y la contraseña como se muestra en el siguiente código:

    const { Sequelize } = require('sequelize');

    module.exports = new Sequelize('Nombre base de datos', 'Usuario', 'Contraseña', {
      host: 'localhost',
      dialect: 'postgres',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    });

### Versión

Este proyecto se encuentra en su versión 1.0

### Autor

Este proyecto fue desarrollado por Alejandro Carvajal Sánchez
