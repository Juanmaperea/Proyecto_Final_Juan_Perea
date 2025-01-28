
// Se instalan los módulos necesarios:
const mongoose = require('mongoose') ;
const Pet = require('../Modelos/Pets') ;

// Controlador para consultar una mascota - Exportación de la función:
exports.getPet = (req,res) => {

    try {

        //const iid = new mongoose.Types.ObjectId( req.body.search_doc_number ) ;

        // Se inicializa el valor recibido en la solicitud:
        const identificacion =  req.body.search_doc_number ;

        // Se consulta en la base de datos:
        Pet.find( {_id:identificacion} )

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

// Controlador para agregar una mascota - Exportación de la función:
exports.addPet = (req,res) => {

    try {
        
        // Se imprimen en consola los datos enviados:
        console.log( "-------->" + JSON.stringify(req.body) ) ;
        
        // Se inicializa el valor recibido en la solicitud:
        var newPet = new Pet( {_id:req.body.identificacion, Nombre:req.body.nombre, Edad:req.body.edad, Raza:req.body.raza, Genero:req.body.genero,Recomendaciones:req.body.recomendaciones,Dueno:req.body.dueno} ) ;

        // Se almacenan los datos de la mascota:
        newPet.save()

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

// Controlador para actualizar una mascota - Exportación de la función:
exports.updatePet = (req,res) => {

    try {
        
        //const iid = new mongoose.Types.ObjectId( req.body.iid ) ;

        // Se inicializa el valor recibido en la solicitud:
        const identificacion =  req.body.identificacion ;

        // Se inicializa el valor recibido en la solicitud y se actualiza la mascota:
        Pet.updateOne( {_id:identificacion}, { $set:{Nombre:req.body.nombre, Edad:req.body.edad, Raza:req.body.raza, Genero:req.body.genero, Recomendaciones:req.body.recomendaciones, Dueno:req.body.dueno} } )
        
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

// Controlador para eliminar una mascota - Exportación de la función:
exports.deletePet = (req,res) => {

    try {

        //const iid = new mongoose.Types.ObjectId( req.body.iid ) ;

        // Se inicializa el valor recibido en la solicitud:
        const identificacion =  req.body.search_doc_number ;
        
        // Se eliminan los datos de la mascota:
        Pet.deleteOne( {_id:identificacion} )

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

// Controlador para enlistar las mascotas - Exportación de la función:
exports.getPets = (req,res) => {

    try {

        // Se buscan todas las mascotas:
        Pet.find()

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

// Controlador para mostrar al dueño de la mascota - Exportación de la función:
exports.PetOwner = (req,res) => {

    try {
        
        //const identificacion = new mongoose.Types.ObjectId( req.body.identificacion ) ;

        const identificacion = req.body.search_doc_number ;

        Pet.aggregate( [
            {
                $match: { _id:identificacion}
            },
            {
                $lookup: {
                    from:'owners',      // LA COLECCION CON LA QUE VAMOS A RELACIONARNOS
                    localField:'Dueno',     // NOMBRE DE LA PROPIEDAD/CAMPO DE LA COLECCION MASCOTAS
                    foreignField:'_id',     // NOMBRE DE LA PROPIEDAD/CAMPO DE LA COLECCION PASEADORES
                    as:'infOwner'             // NOMBRE DEL ARRAY DE SALIDA
                }
            },
            {
                $unwind: '$infOwner'          //DESGLOSE DEL ARRAY EN DOCUMENTOS INDIVIDUALES
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