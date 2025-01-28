
// Se instalan los módulos necesarios:
var mongoose = require('mongoose') ;
var schema   = mongoose.Schema ;

// Modelo de Paseador:
var sqma = new mongoose.Schema(
    {
        _id: {type:String  ,required:"El id es requerido"},
        Documento: {type:String,required:"Tipo de Documento requerido"},
        Nombre: {type:String,required:"Nombre paseador requerido"},
        Telefono: {type:String,required:"Teléfono paseador requerido"},
        Correo: {type:String,required:"Correo paseador requerido"},
        Telefono2: {type:String,required:"Teléfono empresa requerido"},
        Direccion2: {type:String,required:"Dirección empresa requerida"},
        Direccion: {type:String,required:"Dirección paseador requerida"},
        Tarifa: {type:Number,required:"Tarifa paseador requerida"},
        Calificacion: {type:Number,required:"Calificación paseador requerida"},
    },
    { _id: false } 
) ;

module.exports = mongoose.model( 'Walker',sqma ) ;