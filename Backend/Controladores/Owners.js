
// Se instalan los módulos necesarios:
const mongoose = require('mongoose') ;
const Owner = require('../Modelos/Owners') ;

// Controlador para consultar un dueño - Exportación de la función:
exports.getOwner = (req,res) => {

    try {

        //const iid = new mongoose.Types.ObjectId( req.body.search_doc_number ) ;

        // Se inicializa el valor recibido en la solicitud:
        const identificacion =  req.body.search_doc_number ;

        // Se consulta en la base de datos:
        Owner.find( {_id:identificacion} )

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

// Controlador para agregar un dueño - Exportación de la función:
exports.addOwner = (req,res) => {

    try {
        
        // Se imprimen en consola los datos enviados:
        console.log( "-------->" + JSON.stringify(req.body) ) ;
        
        // Se inicializa el valor recibido en la solicitud:
        var newOwner = new Owner( {_id:req.body.identificacion, Nombre:req.body.nombre, Telefono:req.body.telefono, Direccion:req.body.direccion, Correo:req.body.correo} ) ;

        // Se almacenan los datos de la mascota:
        newOwner.save()

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

// Controlador para actualizar un dueño - Exportación de la función:
exports.updateOwner = (req,res) => {

    try {
        
        //const iid = new mongoose.Types.ObjectId( req.body.iid ) ;

        // Se inicializa el valor recibido en la solicitud:
        const identificacion =  req.body.identificacion ;

        // Se inicializa el valor recibido en la solicitud y se actualiza la mascota:
        Owner.updateOne( {_id:identificacion}, { $set:{Nombre:req.body.nombre, Telefono:req.body.telefono, Direccion:req.body.direccion, Correo:req.body.correo} } )
        
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

// Controlador para eliminar un dueño - Exportación de la función:
exports.deleteOwner = (req,res) => {

    try {

        //const iid = new mongoose.Types.ObjectId( req.body.iid ) ;

        // Se inicializa el valor recibido en la solicitud:
        const identificacion =  req.body.search_doc_number ;
        
        // Se eliminan los datos del dueño:
        Owner.deleteOne( {_id:identificacion} )

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

// Controlador para enlistar los dueños - Exportación de la función:
exports.getOwners = (req,res) => {

    try {

        // Se buscan todas los dueños:
        Owner.find()

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