
// Se instalan los módulos necesarios:
var mongoose = require('mongoose') ;
var schema   = mongoose.Schema ;

// Modelo de Mascota:
var sqma = new mongoose.Schema(
    {
        _id: {type:String  ,required:"El id es requerido"},
        Nombre: {type:String,required:"Nombre mascota requerido"},
        Edad: {type:Number,required:"Edad mascota requerida"},
        Raza: {type:String,required:"Raza es requerida"},
        Genero: {type:Number,required:"1:Macho...2:Hembra"},
        Recomendaciones: {type:String,required:"Recomendaciones para el paseador"},
        Dueno: {type:String,required:"Dueño de la mascota requerido"},
    },
    { _id: false } 
) ;

module.exports = mongoose.model( 'Pet',sqma ) ;