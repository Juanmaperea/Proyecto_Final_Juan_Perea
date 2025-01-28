
// Servicios relacionados a las mascotas:
module.exports = function(app) {

    const ctrlWalker = require('../Controladores/Walkers')

    app.route('/Paseadores/getWalkers')
        .get( ctrlWalker.getWalkers ) ;

    app.route('/Paseadores/getWalker')
        .post( ctrlWalker.getWalker ) ;

    app.route( '/Paseadores/addWalker')
        .post( ctrlWalker.addWalker ) ;

    app.route( '/Paseadores/deleteWalker' )
        .post( ctrlWalker.deleteWalker ) ;

    app.route( '/Paseadores/updateWalker' )
        .post( ctrlWalker.updateWalker ) ;

}