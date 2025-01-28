

// Servicios relacionados a las mascotas:
module.exports = function(app) {

    const ctrlPath = require('../Controladores/Paths')

    app.route('/Paseos/getPaths')
        .get( ctrlPath.getPaths ) ;

    app.route('/Paseos/getPath')
        .post( ctrlPath.getPath ) ;

    app.route( '/Paseos/addPath')
        .post( ctrlPath.addPath ) ;

    app.route( '/Paseos/deletePath' )
        .post( ctrlPath.deletePath ) ;

    app.route( '/Paseos/updatePath' )
        .post( ctrlPath.updatePath ) ;

    app.route( '/Paseos/PathPet' )
        .post( ctrlPath.PathPet ) ;

    app.route( '/Paseos/PathWalker' )
        .post( ctrlPath.PathWalker ) ;

}