
// Función para consultar una mascota de acuerdo a su Id:
function getPet() {

    // Se obtiene el Id de la mascota ingresado en el campo dispuesto para ello y se guarda en una variable:
    var data = {
        search_doc_number: document.getElementById("search_doc_number").value
    } ;

    // Se consume la API o servicio creado en el BackEnd:
    fetch( "http://localhost:3000/Mascotas/getPet", {
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

            document.getElementById("new_message").innerHTML = "ERROR:" + JSON.stringify(mm.info) ; ;

        // De lo contrario, se toman los valores de la respuesta y se asignan a los campos correspondientes:
        } else {

            // Si la respuesta es un arreglo con valores:
            if( mm.info.length > 0 ) {
                document.getElementById("doc_number").value = mm.info[0]._id;
                document.getElementById("name").value = mm.info[0].Nombre ;
                document.getElementById("old").value = mm.info[0].Edad ;
                document.getElementById("race").value = mm.info[0].Raza ;
                document.getElementById("genre").value = mm.info[0].Genero ;
                document.getElementById("suggestion").value = mm.info[0].Recomendaciones ;
                document.getElementById("idOwner").value = mm.info[0].Dueno ;

            // Si la respuesta es un arreglo vacío:
            } else {
                alert( "Mascota no existe" ) ;
            }
        }
     } )

     // Si ocurre cualquier otro error, se notifica:
    .catch( (err) => { 
        document.getElementById("new_message").innerHTML = "ERROR:" + err ;
    }) ;

}

// Función para eliminar una mascota de acuerdo a su Id:
function deletePet() {

    // Se obtiene el Id de la mascota ingresado en el campo dispuesto para ello y se guarda en una variable:
    var data = {
        search_doc_number: document.getElementById("search_doc_number").value
    } ;

    // Se consulta sobre la eliminación de la mascota:
    var opc = confirm( "Esta seguro de eliminar a la mascota: " + document.getElementById("search_doc_number").value ) ;

    // Si la respuesta es afirmativa:
    if( opc == true ) {

        // Se consume la API o servicio creado en el BackEnd:
        fetch( "http://localhost:3000/Mascotas/deletePet", {
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

                document.getElementById("new_message").innerHTML = JSON.stringify(mm.info) ; ;
            
            // De lo contrario, se elimina la mascota de acuerdo al Id ingresado y se notifica:
            } else {

                document.getElementById("new_message").innerHTML = "Mascota eliminada del sistema: " + JSON.stringify(mm.info) ;
                getPets() ;
                alert( "Mascota eliminada" ) ;
            }

        } )

        // Si ocurre cualquier otro error, se notifica:
        .catch( (err) => {
            document.getElementById("new_message").innerHTML = "ERROR:" + err ;
         }) ;
    }
    
}

// Función para ingresar una nueva mascota:
function addPet() {

    // Se obtienen los datos ingresados en los campos, de la mascota a ingresar:
    var data = {
        identificacion: document.getElementById("doc_number").value,    
        nombre: document.getElementById("name").value,
        edad: document.getElementById("old").value,
        raza: document.getElementById("race").value,
        genero: document.getElementById("genre").value,
        recomendaciones: document.getElementById("suggestion").value,
        dueno: document.getElementById("idOwner").value
    } ;

    // Se consume la API o servicio creado en el BackEnd:
    fetch( "http://localhost:3000/Mascotas/addPet", {
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

            msg = "ERROR: No fue posible crear la nueva mascota: " + JSON.stringify(mm.info) ;

        // De lo contrario, se agrega la mascota y se notifica:    
        } else {

            msg = "Mascota creada con exito. " ;
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

// Función para actualizar la información de una mascota:
function updatePet() {

    // Se obtienen los datos ingresados en los campos, de la mascota a ingresar:
    var data = {
        identificacion: document.getElementById("doc_number").value,    
        nombre: document.getElementById("name").value,
        edad: document.getElementById("old").value,
        raza: document.getElementById("race").value,
        genero: document.getElementById("genre").value,
        recomendaciones: document.getElementById("suggestion").value,
        dueno: document.getElementById("idOwner").value
    } ;

    // Se consulta sobre la actualización de la mascota:
    var opc = confirm( "Esta seguro de modificar la info de la mascota: " + document.getElementById("doc_number").value ) ;

    // Si la respuesta es afirmativa:
    if( opc == true ) {

        // Se consume la API o servicio creado en el BackEnd:
        fetch( "http://localhost:3000/Mascotas/updatePet", {
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

                msg = "ERROR: No fue posible actualizar la info de la mascota: " + JSON.stringify(mm.info) ; ;

            // De lo contrario, se actualizan los datos de la mascota y se notifica:    
            } else {

                // Si la mascota existe:
                if( mm.info.modifiedCount > 0 ){
                    msg = "Mascota actualizada con exito: " ;
                    getPets() ;

                // Si la mascota no existe:
                } else {
                    msg = "La mascota x actualizar no existe" ;
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
        fillSet( rta ) ;

     } )

    // Si ocurre cualquier otro error, se notifica:
    .catch( (err) => { document.getElementById("new_message").innerHTML }) ;
}

// Función para rellenar el contenido de la tabla del HTML:
function fillSet( rta ) {

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

            // Se crea la celda para la edad:
            tdEdad = document.createElement("td") ;
            tdEdad.innerHTML = rta.info[i].Edad ;
            tr.appendChild( tdEdad ) ;

            // Se crea la celda para la raza:
            tdRaz = document.createElement("td") ;
            tdRaz.innerHTML = rta.info[i].Raza ;
            tr.appendChild( tdRaz ) ;

            // Se crea la celda para el género:
            tdGen = document.createElement("td") ;
            tdGen.innerHTML = rta.info[i].Genero ;
            tr.appendChild( tdGen ) ;

            // Se crea la celda para las recomendaciones:
            tdRec = document.createElement("td") ;
            tdRec.innerHTML = rta.info[i].Recomendaciones ;
            tr.appendChild( tdRec ) ;
            
            // Se crea la celda para el dueño:
            tdIdDueno = document.createElement("td") ;
            tdIdDueno.innerHTML = rta.info[i].Dueno ;
            tr.appendChild( tdIdDueno ) ;

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
                document.getElementById("name").value = rta.info[i].Nombre ;
                document.getElementById("old").value = rta.info[i].Edad ;
                document.getElementById("race").value = rta.info[i].Raza ;
                document.getElementById("genre").value = rta.info[i].Genero ;
                document.getElementById("suggestion").value = rta.info[i].Recomendaciones ;
                document.getElementById("idOwner").value = rta.info[i].Dueno ;
            } ;

            tdAcc.appendChild( icono ) ;
            tr.appendChild( tdAcc ) ;

            // Se agrega la fila a la tabla:
            mySet.appendChild( tr ) ;
        }
}

// Función para relacionar la mascota con su dueño:
function PetOwner() {

    var data = {
        search_doc_number: document.getElementById("search_doc_number").value
    } ;

    fetch( "http://localhost:3000/Mascotas/PetOwner", {
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
            document.getElementById("new_message").innerHTML = "ERROR:" + JSON.stringify(mm.info) ; ;
        } else {
            if( mm.info.length > 0 ) {
                for( let i=0 ; i < mm.info.length ; i++ ) {
                    console.log( "mascota:" + mm.info[i].Nombre + "---Paseador:" + mm.info[i].infOwner.Nombre + ":)" ) ;
                    document.getElementById("new_message").innerHTML =  "<b> INFORMACIÓN DEL DUEÑO DE LA MASCOTA:</b>  " + "<br>" +
                                                                        "<b>Mascota:</b> " + mm.info[i].Nombre + "<br>" +
                                                                        "<b>Dueño:</b> " + mm.info[i].infOwner.Nombre + "<br>" +
                                                                        "<b>Teléfono:</b> " + mm.info[i].infOwner.Telefono + "<br>" +
                                                                        "<b>Dirección:</b> " + mm.info[i].infOwner.Direccion + "<br>" +
                                                                        "<b>Correo:</b> " + mm.info[i].infOwner.Correo;
                }
            } else {
                alert( "Mascota no existe" ) ;
            }
        }
     } )
    .catch( (err) => { 
        document.getElementById("new_message").innerHTML = "ERROR:" + err ;
    }) ;

}