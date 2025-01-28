// Servicios relacionados a las mascotas:
module.exports = function(app) {

    const ctrlOwner = require('../Controladores/Owners')

    app.route('/Duenos/getOwners')
        .get( ctrlOwner.getOwners ) ;

    app.route('/Duenos/getOwner')
        .post( ctrlOwner.getOwner ) ;

    app.route( '/Duenos/addOwner')
        .post( ctrlOwner.addOwner ) ;

    app.route( '/Duenos/deleteOwner' )
        .post( ctrlOwner.deleteOwner ) ;

    app.route( '/Duenos/updateOwner' )
        .post( ctrlOwner.updateOwner ) ;

}