
// Se instalan los módulos necesarios:
var mongoose = require('mongoose') ;
var schema   = mongoose.Schema ;

// Modelo de Paseo:
var sqma = new mongoose.Schema(
    {
        _id: {type:String  ,required:"El id es requerido"},
        Fecha: {type:String,required:"Tipo de Documento requerido"},
        Hora: {type:String,required:"Nombre paseador requerido"},
        Duracion: {type:Number,required:"Teléfono paseador requerido"},
        Mascota: {type:String,required:"Correo paseador requerido"},
        Paseador: {type:String,required:"Teléfono empresa requerido"},
        Novedades: {type:String,required:"Dirección empresa requerida"},
    },
    { _id: false } 
) ;

module.exports = mongoose.model( 'Path',sqma ) ;