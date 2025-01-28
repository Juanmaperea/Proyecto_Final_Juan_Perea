
// Servicios relacionados a las mascotas:
module.exports = function(app) {

    const ctrlPet = require('../Controladores/Pets')

    app.route('/Mascotas/getPets')
        .get( ctrlPet.getPets ) ;

    app.route('/Mascotas/getPet')
        .post( ctrlPet.getPet ) ;

    app.route( '/Mascotas/addPet')
        .post( ctrlPet.addPet ) ;

    app.route( '/Mascotas/deletePet' )
        .post( ctrlPet.deletePet ) ;

    app.route( '/Mascotas/updatePet' )
        .post( ctrlPet.updatePet ) ;

    app.route( '/Mascotas/PetOwner' )
        .post( ctrlPet.PetOwner ) ;

}