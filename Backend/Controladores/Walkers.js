
// Se instalan los módulos necesarios:
const mongoose = require('mongoose') ;
const Walker = require('../Modelos/Walkers') ;

// Controlador para consultar un paseador - Exportación de la función:
exports.getWalker = (req,res) => {

    try {

        //const iid = new mongoose.Types.ObjectId( req.body.search_doc_number ) ;

        // Se inicializa el valor recibido en la solicitud:
        const identificacion =  req.body.search_doc_number ;

        // Se consulta en la base de datos:
        Walker.find( {_id:identificacion} )

        // En caso que todo salga bien:
        .then(  (rta) => {
            res.send( {rta:"OK",info:rta} )
        } )

        // En caso que haya un error:
        .catch( (err) => {
            res.send( {rta:"ER",info:err} ) ;
        } ) ;

    // Si ocurre cualquier otro error, se notifica:
    } catch (error) {
        res.send( {rta:"ER",info:error} ) ;
    }

} ;

// Controlador para agregar un paseador - Exportación de la función:
exports.addWalker = (req,res) => {

    try {
        
        // Se imprimen en consola los datos enviados:
        console.log( "-------->" + JSON.stringify(req.body) ) ;
        
        // Se inicializa el valor recibido en la solicitud:
        var newWalker = new Walker( {_id:req.body.identificacion, Documento:req.body.documento, Nombre:req.body.nombre, Telefono:req.body.telefono, Correo:req.body.correo, Telefono2:req.body.telefono2, Direccion2:req.body.direccion2, Direccion:req.body.direccion, Tarifa:req.body.tarifa, Calificacion:req.body.calificacion} ) ;

        // Se almacenan los datos del paseador:
        newWalker.save()

        // En caso que todo salga bien:
        .then(  (rta) => {
            res.send( {rta:"OK",info:rta} ) ;
        } )

        // En caso que haya un error:
        .catch( (err) => {
            res.send( {rta:"ER",info:err} ) ;
        } ) ;

    // Si ocurre cualquier otro error, se notifica:
    } catch (error) {
        res.send( {rta:"ER",info:error} ) ;
    }

} ;

// Controlador para actualizar un paseador - Exportación de la función:
exports.updateWalker = (req,res) => {

    try {
        
        //const iid = new mongoose.Types.ObjectId( req.body.iid ) ;

        // Se inicializa el valor recibido en la solicitud:
        const identificacion =  req.body.identificacion ;

        // Se inicializa el valor recibido en la solicitud y se actualiza el paseador:
        Walker.updateOne( {_id:identificacion}, { $set:{Documento:req.body.documento, Nombre:req.body.nombre, Telefono:req.body.telefono, Correo:req.body.correo, Telefono2:req.body.telefono2, Direccion2:req.body.direccion2, Direccion:req.body.direccion, Tarifa:req.body.tarifa, Calificacion:req.body.calificacion} } )
        
        // En caso que todo salga bien:
        .then(  (rta) => {
            res.send( {rta:"OK",info:rta} ) ;
        } )

        // En caso que haya un error:
        .catch( (err) => {
            res.send( {rta:"ER",info:err} ) ;
        } ) ;

    // Si ocurre cualquier otro error, se notifica:
    } catch (error) {
        res.send( {rta:"ER",info:error} ) ;
    }

} ;

// Controlador para eliminar un paseador - Exportación de la función:
exports.deleteWalker = (req,res) => {

    try {

        //const iid = new mongoose.Types.ObjectId( req.body.iid ) ;

        // Se inicializa el valor recibido en la solicitud:
        const identificacion =  req.body.search_doc_number ;
        
        // Se eliminan los datos de la mascota:
        Walker.deleteOne( {_id:identificacion} )

        // En caso que todo salga bien:
        .then(  (rta) => {
            res.send( {rta:"OK",info:rta} ) ;
        } )

        // En caso que haya un error:
        .catch( (err) => {
            res.send( {rta:"ER",info:err} ) ;
        } ) ;

    // Si ocurre cualquier otro error, se notifica:
    } catch (error) {
        res.send( {rta:"ER",info:error} ) ;
    }

} ;

// Controlador para enlistar los paseadores - Exportación de la función:
exports.getWalkers = (req,res) => {

    try {

        // Se buscan todas los paseadores:
        Walker.find()

        // En caso que todo salga bien:
        .then( (rta) => {
            res.send( {rta:"OK",info:rta} ) ;
        } )

        // En caso que haya un error:
        .catch( (err) => {
            res.send( {rta:"ER",info:err} ) ;
        } ) ;
    
    // Si ocurre cualquier otro error, se notifica:
    } catch (error) {
        res.send( {rta:"ER",info:error} ) ;
    }
} ;