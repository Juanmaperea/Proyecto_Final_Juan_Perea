// Se instalan los módulos necesarios:
const http = require('http'); // Para el protocolo de comunicación.
const path = require('path'); // Para manerar directorios.
const fs = require('fs'); // Para modificar archivos del sistema.
const express = require('express'); // Para usar el framework de Express.
const morgan = require('morgan'); // Para registrar o logear las solicitudes.
const bp = require('body-parser'); // Para atender las solicitudes post.
const cors = require('cors'); // Para conectar con el frontend.
const mongoose = require('mongoose'); // Para conectar con la base de datos.
const mongodb = require("mongodb"); // Para soportar mongoose.

// Se especifica el nombre del host y el puerto:
const hostname = "localhost" ;
const port = 3000 ;

// Configuración para conexión a la base de datos en MongoDB:
var bdURL = "mongodb://127.0.0.1:27017/WalkyPawsBD";
mongoose.connect(bdURL);

// Configuración de los eventos de la base de datos:
mongoose.connection.on('connected', function() {console.log("Conexión a mongodb realizada: " + bdURL); });
mongoose.connection.on('error', function(err) {console.log("ERROR: No hay conexión a mongodb: " + err); });
mongoose.connection.on('disconnected', function(msg) {console.log("Desconectado de mongodb: " + msg); });

process.on('SIGNIN', function() {
    mongoose.connection.close( function() {
        console.log("Conexión a mongodb terminada por finalización del servidor");
        process.exit(0);
    });
});

// Creación de aplicación Express:
const app = express();

// Configuración del middleware Morgan en una aplicación Express:
app.use(morgan('dev')) ;

// Configuración del middleware bp en una aplicación Express:
app.use(bp.json())

// Configuración del middleware corse en una aplicación Express:
app.use(cors());

// Importando las rutas con la instancia Express creada:
require('./Rutas/Pets')(app);
require('./Rutas/Owners')(app);
require('./Rutas/Walkers')(app);
require('./Rutas/Paths')(app);

// Directorio de donde se tomarán los archivos:
//app.use( express.static( path.join( __dirname + '/public' ) ) ) ;

// Configuración del puerto para entrada de las solicitudes:
app.use( (req, res, next) => {
    console.log("Cabecera:" + req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><head><title>Express</title></head><body><h1>HOLA MUNDO EXPRESS</h1></body></html>');
});

// Crreación del servidor:
const server = http.createServer(app);

server.listen( port,hostname, () => {
    console.log(`Servidor en ejecución en http://${hostname}:${port}/`) ;
} ) ;