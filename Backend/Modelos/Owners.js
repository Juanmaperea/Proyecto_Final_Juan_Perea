
// Se instalan los módulos necesarios:
var mongoose = require('mongoose') ;
var schema   = mongoose.Schema ;

// Modelo de Dueño:
var sqma = new mongoose.Schema(
    {
        _id: {type:String  ,required:"El id es requerido"},
        Nombre: {type:String,required:"Nombre dueño requerido"},
        Telefono: {type:Number,required:"Teléfono dueño requerido"},
        Direccion: {type:String,required:"Dirección dueño requerido"},
        Correo: {type:String,required:"Correo dueño requerido"},
    },
    { _id: false } 
) ;

module.exports = mongoose.model( 'Owner',sqma ) ;