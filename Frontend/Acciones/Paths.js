

// Función para consultar un paseo de acuerdo a su Id:
function getPath() {

    // Se obtiene el Id del paseador ingresado en el campo dispuesto para ello y se guarda en una variable:
    var data = {
        search_doc_number: document.getElementById("search_doc_number").value
    } ;

    // Se consume la API o servicio creado en el BackEnd:
    fetch( "http://localhost:3000/Paseos/getPath", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify( data )
    } )
    
    // Se procesa la respuesta obtenida de la solicitud hecha anteriormente:
    .then( (rta1) => { return( rta1.json() ) } )
    .then( (mm) => { 

        console.log( "------->" + JSON.stringify(mm) ) ;

        // Si la respuesta es un error, se notifica:
        if( mm.rta == "ER" ) {

            document.getElementById("new_message").innerHTML = "ERROR:" + JSON.stringify(mm.info) ;

        // De lo contrario, se toman los valores de la respuesta y se asignan a los campos correspondientes:
        } else {

            // Si la respuesta es un arreglo con valores:
            if( mm.info.length > 0 ) {
                document.getElementById("doc_number").value = mm.info[0]._id ;
                document.getElementById("date").value = mm.info[0].Fecha ;
                document.getElementById("time").value = mm.info[0].Hora ;
                document.getElementById("long").value = mm.info[0].Duracion ;
                document.getElementById("idPet").value = mm.info[0].Mascota ;
                document.getElementById("idWalker").value = mm.info[0].Paseador ;
                document.getElementById("news").value = mm.info[0].Novedades ;

            // Si la respuesta es un arreglo vacío:
            } else {
                alert( "Paseo no existe" ) ;
            }
        }
     } )

     // Si ocurre cualquier otro error, se notifica:
    .catch( (err) => { 
        document.getElementById("new_message").innerHTML = "ERROR:" + err ;
    }) ;

}

// Función para eliminar un paseo de acuerdo a su Id:
function deletePath() {

    // Se obtiene el Id del paseador ingresado en el campo dispuesto para ello y se guarda en una variable:
    var data = {
        search_doc_number: document.getElementById("search_doc_number").value
    } ;

    // Se consulta sobre la eliminación del paseador:
    var opc = confirm( "Esta seguro de eliminar el paseo: " + document.getElementById("search_doc_number").value ) ;

    // Si la respuesta es afirmativa:
    if( opc == true ) {

        // Se consume la API o servicio creado en el BackEnd:
        fetch( "http://localhost:3000/Paseos/deletePath", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify( data )
        } )

        // Se procesa la respuesta obtenida de la solicitud hecha anteriormente:
        .then( (rta1) => { return( rta1.json() ) } )
        .then( (mm) => { 
            
            // Si la respuesta es un error, se notifica:
            if( mm.rta == "ER" ) {

                document.getElementById("new_message").innerHTML = JSON.stringify(mm.info) ;
            
            // De lo contrario, se elimina el paseo de acuerdo al Id ingresado y se notifica:
            } else {

                document.getElementById("new_message").innerHTML = "Paseo eliminado del sistema: " + JSON.stringify(mm.info) ;
                getPaths() ;
                alert( "Paseo eliminado" ) ;
            }

        } )

        // Si ocurre cualquier otro error, se notifica:
        .catch( (err) => {
            document.getElementById("new_message").innerHTML = "ERROR:" + err ;
         }) ;
    }
    
}

// Función para ingresar un nuevo paseo:
function addPath() {

    // Se obtienen los datos ingresados en los campos, del paseo a ingresar:
    var data = {
        identificacion: document.getElementById("doc_number").value,    
        fecha: document.getElementById("date").value,
        hora: document.getElementById("time").value,
        duracion: document.getElementById("long").value,
        mascota: document.getElementById("idPet").value,
        paseador: document.getElementById("idWalker").value,
        novedades: document.getElementById("news").value
    } ;

    // Se consume la API o servicio creado en el BackEnd:
    fetch( "http://localhost:3000/Paseos/addPath", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify( data )
    } )

    // Se procesa la respuesta obtenida de la solicitud hecha anteriormente:
    .then( (rta1) => { return( rta1.json() ) } )
    .then( (mm) => { 
        
        var msg = "" ;

        // Si la respuesta es un error, se notifica:
        if( mm.rta == "ER" ) {

            msg = "ERROR: No fue posible crear el nuevo paseo: " + JSON.stringify(mm.info) ;

        // De lo contrario, se agrega la mascota y se notifica:    
        } else {

            msg = "Paseo creado con exito. " ;
        }

        // Se notifica el mensaje final:
        document.getElementById("new_message").innerHTML = msg
        alert( msg ) ;

    } )

    // Si ocurre cualquier otro error, se notifica:
    .catch( (err) => {
        document.getElementById("new_message").innerHTML = "ERROR:" + err ;
    }) ;
    
}

// Función para actualizar la información del paseo:
function updatePath() {

    // Se obtienen los datos ingresados en los campos, del paseo a ingresar:
    var data = {
        identificacion: document.getElementById("doc_number").value,    
        fecha: document.getElementById("date").value,
        hora: document.getElementById("time").value,
        duracion: document.getElementById("long").value,
        mascota: document.getElementById("idPet").value,
        paseador: document.getElementById("idWalker").value,
        novedades: document.getElementById("news").value
    } ;

    // Se consulta sobre la actualización del paseo:
    var opc = confirm( "Esta seguro de modificar la info del paseo: " + document.getElementById("doc_number").value ) ;

    // Si la respuesta es afirmativa:
    if( opc == true ) {

        // Se consume la API o servicio creado en el BackEnd:
        fetch( "http://localhost:3000/Paseos/updatePath", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify( data )
        } )

        // Se procesa la respuesta obtenida de la solicitud hecha anteriormente:
        .then( (rta1) => { return( rta1.json() ) } )
        .then( (mm) => { 
            
            var msg = "" ;

            // Si la respuesta es un error, se notifica:
            if( mm.rta == "ER" ) {

                msg = "ERROR: No fue posible actualizar la info del paseo: " + JSON.stringify(mm.info) ;

            // De lo contrario, se actualizan los datos del paseador y se notifica:    
            } else {

                // Si la mascota existe:
                if( mm.info.modifiedCount > 0 ){
                    msg = "Paseo actualizado con exito: " ;
                    getPaths() ;

                // Si la mascota no existe:
                } else {
                    msg = "El paseo x actualizar no existe" ;
                }
            }

            // Se notifica el mensaje final:
            document.getElementById("new_message").innerHTML = msg
            alert( msg ) ;

        } )

        // Si ocurre cualquier otro error, se notifica:
        .catch( (err) => {
            document.getElementById("new_message").innerHTML = "ERROR:" + err ;
         }) ;
    }
    
}

// Función para obtener todas los paseos registrados:
function getPaths() {

    // Se consume la API o servicio creado en el BackEnd:
    fetch( "http://localhost:3000/Paseos/getPaths", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    } )

    // Se procesa la respuesta obtenida de la solicitud hecha anteriormente:
    .then( (rta1) => { return( rta1.json() ) } )
    .then( (rta) => { 

        console.log( "=======>" + JSON.stringify(rta) ) ;
        
        // Se ejecuta la función fillSet para rellenar la tabla creada con los datos de los paseos:
        fillSet( rta ) ;

     } )

    // Si ocurre cualquier otro error, se notifica:
    .catch( (err) => { document.getElementById("new_message").innerHTML }) ;
}

// Función para rellenar el contenido de la tabla del HTML:
function fillSet( rta ) {

    // Se define la tabla a modificar:
    var mySet = document.getElementById("set_paths").querySelector("tbody") ;

    // Se vacía la tabla:
    mySet.innerHTML = "" ;

        // De acuerdo al número de elementos de la respuesta, se crean dinámicamente las filas y sus celdas:
        for( let i=0 ; i < rta.info.length ; i=i+1 ) {

            // Se crea la fila:
            tr = document.createElement("tr") ;

            // Se crea la celda para la identificación:
            tdId = document.createElement("td") ;
            tdId.innerHTML = rta.info[i]._id ;
            tr.appendChild( tdId ) ;

            // Se crea la celda para la fehca:
            tdFech = document.createElement("td") ;
            tdFech.innerHTML = rta.info[i].Fecha ;
            tr.appendChild( tdFech ) ;

            // Se crea la celda para la hora:
            tdHor = document.createElement("td") ;
            tdHor.innerHTML = rta.info[i].Hora ;
            tr.appendChild( tdHor ) ;

            // Se crea la celda para la duración:
            tdDur = document.createElement("td") ;
            tdDur.innerHTML = rta.info[i].Duracion ;
            tr.appendChild( tdDur ) ;

            // Se crea la celda para la mascota:
            tdMas = document.createElement("td") ;
            tdMas.innerHTML = rta.info[i].Mascota ;
            tr.appendChild( tdMas ) ;

            // Se crea la celda para el paseador:
            tdPas = document.createElement("td") ;
            tdPas.innerHTML = rta.info[i].Paseador ;
            tr.appendChild( tdPas ) ;

            // Se crea la celda para las novedades:
            tdNov = document.createElement("td") ;
            tdNov.innerHTML = rta.info[i].Novedades ;
            tr.appendChild( tdNov ) ;

            // Se crea un ícono para modificar de forma interactiva desde la tabla de la página:
            tdAcc = document.createElement("td") ;
            //icono = document.createElement("i") ;

            const icono = document.createElement("img");
            icono.src = "/Recursos/Imágenes/Edit.png"; 
            icono.alt = "Editar";
            icono.style.width = "20px"; // Ancho en píxeles
            icono.style.height = "20px"; 
            icono.style.cursor = "pointer"; 

            // Se configura el ícono:
            //icono.className = "bi bi-binoculars" ;
            icono.onclick = function() {
                document.getElementById("doc_number").value = rta.info[i]._id ;
                document.getElementById("date").value = rta.info[i].Fecha ;
                document.getElementById("time").value = rta.info[i].Hora ;
                document.getElementById("long").value = rta.info[i].Duracion ;
                document.getElementById("idPet").value = rta.info[i].Mascota ;
                document.getElementById("idWalker").value = rta.info[i].Paseador ;
                document.getElementById("News").value = rta.info[i].Novedades ;
            } ;

            tdAcc.appendChild( icono ) ;
            tr.appendChild( tdAcc ) ;

            // Se agrega la fila a la tabla:
            mySet.appendChild( tr ) ;
        }
}

// Función para cargar las tablas al ejecutar la página:
document.addEventListener("DOMContentLoaded", () => {
    getPets();
    getWalkers();
});

// Función para obtener todas las mascotas registradas:
function getPets() {

    // Se consume la API o servicio creado en el BackEnd:
    fetch( "http://localhost:3000/Mascotas/getPets", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    } )

    // Se procesa la respuesta obtenida de la solicitud hecha anteriormente:
    .then( (rta1) => { return( rta1.json() ) } )
    .then( (rta) => { 

        console.log( "=======>" + JSON.stringify(rta) ) ;
        
        // Se ejecuta la función fillSet para rellenar la tabla creada con los datos de las mascotas:
        fillSetPet( rta ) ;

     } )

    // Si ocurre cualquier otro error, se notifica:
    .catch( (err) => { document.getElementById("new_message").innerHTML }) ;
}

// Función para rellenar el contenido de la tabla del HTML:
function fillSetPet( rta ) {

    // Se define la tabla a modificar:
    var mySet = document.getElementById("set_pets").querySelector("tbody") ;

    // Se vacía la tabla:
    mySet.innerHTML = "" ;

        // De acuerdo al número de elementos de la respuesta, se crean dinámicamente las filas y sus celdas:
        for( let i=0 ; i < rta.info.length ; i=i+1 ) {

            // Se crea la fila:
            tr = document.createElement("tr") ;

            // Se crea la celda para la identificación:
            tdId = document.createElement("td") ;
            tdId.innerHTML = rta.info[i]._id ;
            tr.appendChild( tdId ) ;

            // Se crea la celda para el nombre:
            tdNom = document.createElement("td") ;
            tdNom.innerHTML = rta.info[i].Nombre ;
            tr.appendChild( tdNom ) ;

            // Se crea la celda para el dueño:
            tdIdDueno = document.createElement("td") ;
            tdIdDueno.innerHTML = rta.info[i].Dueno ;
            tr.appendChild( tdIdDueno ) ;

            // Se agrega la fila a la tabla:
            mySet.appendChild( tr ) ;
        }
}

// Función para obtener todas los paseadores registrados:
function getWalkers() {

    // Se consume la API o servicio creado en el BackEnd:
    fetch( "http://localhost:3000/Paseadores/getWalkers", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    } )

    // Se procesa la respuesta obtenida de la solicitud hecha anteriormente:
    .then( (rta1) => { return( rta1.json() ) } )
    .then( (rta) => { 

        console.log( "=======>" + JSON.stringify(rta) ) ;
        
        // Se ejecuta la función fillSet para rellenar la tabla creada con los datos de los paseadores:
        fillSetWalker( rta ) ;

     } )

    // Si ocurre cualquier otro error, se notifica:
    .catch( (err) => { document.getElementById("new_message").innerHTML }) ;
}

// Función para rellenar el contenido de la tabla del HTML:
function fillSetWalker( rta ) {

    // Se define la tabla a modificar:
    var mySet = document.getElementById("set_walkers").querySelector("tbody") ;

    // Se vacía la tabla:
    mySet.innerHTML = "" ;

        // De acuerdo al número de elementos de la respuesta, se crean dinámicamente las filas y sus celdas:
        for( let i=0 ; i < rta.info.length ; i=i+1 ) {

            // Se crea la fila:
            tr = document.createElement("tr") ;

            // Se crea la celda para la identificación:
            tdId = document.createElement("td") ;
            tdId.innerHTML = rta.info[i]._id ;
            tr.appendChild( tdId ) ;

            // Se crea la celda para el nombre:
            tdNom = document.createElement("td") ;
            tdNom.innerHTML = rta.info[i].Nombre ;
            tr.appendChild( tdNom ) ;

            // Se crea la celda para la teléfono:
            tdTel = document.createElement("td") ;
            tdTel.innerHTML = rta.info[i].Telefono ;
            tr.appendChild( tdTel ) ;

            // Se crea la celda para la tarifa:
            tdTar = document.createElement("td") ;
            tdTar.innerHTML = rta.info[i].Tarifa ;
            tr.appendChild( tdTar ) ;

            // Se crea la celda para la calificación:
            tdCal = document.createElement("td") ;
            tdCal.innerHTML = rta.info[i].Calificacion ;
            tr.appendChild( tdCal ) ;

            // Se agrega la fila a la tabla:
            mySet.appendChild( tr ) ;
        }
}

// Función para relacionar al paseo con su mascota:
function PathPet() {

    var data = {
        search_doc_number: document.getElementById("search_doc_number").value
    } ;

    fetch( "http://localhost:3000/Paseos/PathPet", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify( data )
    } )
    .then( (rta1) => { return( rta1.json() ) } )
    .then( (mm) => { 

        console.log( "------->" + JSON.stringify(mm) ) ;

        if( mm.rta == "ER" ) {
            document.getElementById("new_message").innerHTML = "ERROR:" + JSON.stringify(mm.info) ;
        } else {
            if( mm.info.length > 0 ) {
                for( let i=0 ; i < mm.info.length ; i++ ) {
                    console.log( "mascota:" + mm.info[i].Nombre + "---Paseador:" + mm.info[i].infPet.Nombre + ":)" ) ;
                    document.getElementById("new_message").innerHTML =  "<b> INFORMACIÓN DE LA MASCOTA DEL PASEO:</b>  " + "<br>" +
                                                                        "<b>Identificación:</b> " + mm.info[i].infPet._id + "<br>" +
                                                                        "<b>Nombre:</b> " + mm.info[i].infPet.Nombre + "<br>" +
                                                                        "<b>Edad:</b> " + mm.info[i].infPet.Edad + "<br>" +
                                                                        "<b>Raza:</b> " + mm.info[i].infPet.Raza + "<br>" +
                                                                        "<b>Género:</b> " + mm.info[i].infPet.Genero + "<br>" +
                                                                        "<b>Recomendaciones:</b> " + mm.info[i].infPet.Recomendaciones + "<br>" +
                                                                        "<b>Dueño:</b> " + mm.info[i].infPet.Dueno;
                }
            } else {
                alert( "Paseo no existe" ) ;
            }
        }
     } )
    .catch( (err) => { 
        document.getElementById("new_message").innerHTML = "ERROR:" + err ;
    }) ;

}

// Función para relacionar al paseo con su paseador:
function PathWalker() {

    var data = {
        search_doc_number: document.getElementById("search_doc_number").value
    } ;

    fetch( "http://localhost:3000/Paseos/PathWalker", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify( data )
    } )
    .then( (rta1) => { return( rta1.json() ) } )
    .then( (mm) => { 

        console.log( "------->" + JSON.stringify(mm) ) ;

        if( mm.rta == "ER" ) {
            document.getElementById("new_message").innerHTML = "ERROR:" + JSON.stringify(mm.info) ;
        } else {
            if( mm.info.length > 0 ) {
                for( let i=0 ; i < mm.info.length ; i++ ) {
                    console.log( "mascota:" + mm.info[i].Nombre + "---Paseador:" + mm.info[i].infWalker.Nombre + ":)" ) ;
                    document.getElementById("new_message").innerHTML =  "<b> INFORMACIÓN DEL PASEADOR DEL PASEO:</b>  " + "<br>" +
                                                                        "<b>Identificación:</b> " + mm.info[i].infWalker._id + "<br>" +
                                                                        "<b>Tipo de Documento:</b> " + mm.info[i].infWalker.Documento + "<br>" +
                                                                        "<b>Nombre:</b> " + mm.info[i].infWalker.Nombre+ "<br>" +
                                                                        "<b>Teléfono:</b> " + mm.info[i].infWalker.Telefono + "<br>" +
                                                                        "<b>Correo:</b> " + mm.info[i].infWalker.Correo + "<br>" +
                                                                        "<b>Tel. Empresa:</b> " + mm.info[i].infWalker.Telefono2+ "<br>" +
                                                                        "<b>Dir. Empresa:</b> " + mm.info[i].infWalker.Direccion2 + "<br>" +
                                                                        "<b>Dirección:</b> " + mm.info[i].infWalker.Direccion + "<br>" +
                                                                        "<b>Tarifa:</b> " + mm.info[i].infWalker.Tarifa + "<br>" +
                                                                        "<b>Calificación:</b> " + mm.info[i].infWalker.Calificacion;
                }
            } else {
                alert( "Paseo no existe" ) ;
            }
        }
     } )
    .catch( (err) => { 
        document.getElementById("new_message").innerHTML = "ERROR:" + err ;
    }) ;

}