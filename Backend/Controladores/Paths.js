
// Se instalan los módulos necesarios:
const mongoose = require('mongoose') ;
const Path = require('../Modelos/Paths') ;

// Controlador para consultar un paseo - Exportación de la función:
exports.getPath = (req,res) => {

    try {

        //const iid = new mongoose.Types.ObjectId( req.body.search_doc_number ) ;

        // Se inicializa el valor recibido en la solicitud:
        const identificacion =  req.body.search_doc_number ;

        // Se consulta en la base de datos:
        Path.find( {_id:identificacion} )

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

// Controlador para agregar un paseo - Exportación de la función:
exports.addPath = (req,res) => {

    try {
        
        // Se imprimen en consola los datos enviados:
        console.log( "-------->" + JSON.stringify(req.body) ) ;
        
        // Se inicializa el valor recibido en la solicitud:
        var newPath = new Path( {_id:req.body.identificacion, Fecha:req.body.fecha, Hora:req.body.hora, Duracion:req.body.duracion, Mascota:req.body.mascota, Paseador:req.body.paseador, Novedades:req.body.novedades} ) ;

        // Se almacenan los datos del paseo:
        newPath.save()

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

// Controlador para actualizar un paseo - Exportación de la función:
exports.updatePath = (req,res) => {

    try {
        
        //const iid = new mongoose.Types.ObjectId( req.body.iid ) ;

        // Se inicializa el valor recibido en la solicitud:
        const identificacion =  req.body.identificacion ;

        // Se inicializa el valor recibido en la solicitud y se actualiza el paseo
        Path.updateOne( {_id:identificacion}, { $set:{Fecha:req.body.fecha, Hora:req.body.hora, Duracion:req.body.duracion, Mascota:req.body.mascota, Paseador:req.body.paseador, Novedades:req.body.novedades} } )
        
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

// Controlador para eliminar un paseo- Exportación de la función:
exports.deletePath = (req,res) => {

    try {

        //const iid = new mongoose.Types.ObjectId( req.body.iid ) ;

        // Se inicializa el valor recibido en la solicitud:
        const identificacion =  req.body.search_doc_number ;
        
        // Se eliminan los datos del paseo:
        Path.deleteOne( {_id:identificacion} )

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

// Controlador para enlistar los paseos - Exportación de la función:
exports.getPaths = (req,res) => {

    try {

        // Se buscan todas los paseos:
        Path.find()

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

// Controlador para mostrar a la mascota del paseo - Exportación de la función:
exports.PathPet = (req,res) => {

    try {
        
        //const identificacion = new mongoose.Types.ObjectId( req.body.identificacion ) ;

        const identificacion = req.body.search_doc_number ;

        Path.aggregate( [
            {
                $match: { _id:identificacion}
            },
            {
                $lookup: {
                    from:'pets',      // LA COLECCION CON LA QUE VAMOS A RELACIONARNOS
                    localField:'Mascota',     // NOMBRE DE LA PROPIEDAD/CAMPO DE LA COLECCION MASCOTAS
                    foreignField:'_id',     // NOMBRE DE LA PROPIEDAD/CAMPO DE LA COLECCION PASEADORES
                    as:'infPet'             // NOMBRE DEL ARRAY DE SALIDA
                }
            },
            {
                $unwind: '$infPet'          //DESGLOSE DEL ARRAY EN DOCUMENTOS INDIVIDUALES
            }
        ] )
        .then(  (rta) => {
            res.send( {rta:"OK",info:rta} ) ;
        } )
        .catch( (err) => {
            res.send( {rta:"ER",info:err} ) ;
        } ) ;

    } catch (error) {
        res.send( {rta:"ER",info:error} ) ;
    }

} ;

// Controlador para mostrar al paseador del paseo - Exportación de la función:
exports.PathWalker = (req,res) => {

    try {
        
        //const identificacion = new mongoose.Types.ObjectId( req.body.identificacion ) ;

        const identificacion = req.body.search_doc_number ;

        Path.aggregate( [
            {
                $match: { _id:identificacion}
            },
            {
                $lookup: {
                    from:'walkers',      // LA COLECCION CON LA QUE VAMOS A RELACIONARNOS
                    localField:'Paseador',     // NOMBRE DE LA PROPIEDAD/CAMPO DE LA COLECCION MASCOTAS
                    foreignField:'_id',     // NOMBRE DE LA PROPIEDAD/CAMPO DE LA COLECCION PASEADORES
                    as:'infWalker'             // NOMBRE DEL ARRAY DE SALIDA
                }
            },
            {
                $unwind: '$infWalker'          //DESGLOSE DEL ARRAY EN DOCUMENTOS INDIVIDUALES
            }
        ] )
        .then(  (rta) => {
            res.send( {rta:"OK",info:rta} ) ;
        } )
        .catch( (err) => {
            res.send( {rta:"ER",info:err} ) ;
        } ) ;

    } catch (error) {
        res.send( {rta:"ER",info:error} ) ;
    }

} ;