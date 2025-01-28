
// Función para consultar un paseador de acuerdo a su Id:
function getWalker() {

    // Se obtiene el Id del paseador ingresado en el campo dispuesto para ello y se guarda en una variable:
    var data = {
        search_doc_number: document.getElementById("search_doc_number").value
    } ;

    // Se consume la API o servicio creado en el BackEnd:
    fetch( "http://localhost:3000/Paseadores/getWalker", {
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
                document.getElementById("name").value = mm.info[0].Nombre ;
                document.getElementById("doc_type").value = mm.info[0].Documento ;
                document.getElementById("phone").value = mm.info[0].Telefono ;
                document.getElementById("email").value = mm.info[0].Correo ;
                document.getElementById("phone_B").value = mm.info[0].Telefono2 ;
                document.getElementById("address_B").value = mm.info[0].Direccion2 ;
                document.getElementById("address").value = mm.info[0].Direccion ;
                document.getElementById("fee").value = mm.info[0].Tarifa ;
                document.getElementById("score").value = mm.info[0].Calificacion ;

            // Si la respuesta es un arreglo vacío:
            } else {
                alert( "Paseador no existe" ) ;
            }
        }
     } )

     // Si ocurre cualquier otro error, se notifica:
    .catch( (err) => { 
        document.getElementById("new_message").innerHTML = "ERROR:" + err ;
    }) ;

}

// Función para eliminar un paseador de acuerdo a su Id:
function deleteWalker() {

    // Se obtiene el Id del paseador ingresado en el campo dispuesto para ello y se guarda en una variable:
    var data = {
        search_doc_number: document.getElementById("search_doc_number").value
    } ;

    // Se consulta sobre la eliminación del paseador:
    var opc = confirm( "Esta seguro de eliminar al paseador: " + document.getElementById("search_doc_number").value ) ;

    // Si la respuesta es afirmativa:
    if( opc == true ) {

        // Se consume la API o servicio creado en el BackEnd:
        fetch( "http://localhost:3000/Paseadores/deleteWalker", {
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

                document.getElementById("new_message").innerHTML = "Paseador eliminado del sistema: " + JSON.stringify(mm.info) ;
                getWalkers() ;
                alert( "Paseador eliminado" ) ;
            }

        } )

        // Si ocurre cualquier otro error, se notifica:
        .catch( (err) => {
            document.getElementById("new_message").innerHTML = "ERROR:" + err ;
         }) ;
    }
    
}

// Función para ingresar un nuevo paseador:
function addWalker() {

    // Se obtienen los datos ingresados en los campos, del paseador a ingresar:
    var data = {
        identificacion: document.getElementById("doc_number").value,    
        nombre: document.getElementById("name").value,
        documento: document.getElementById("doc_type").value,
        telefono: document.getElementById("phone").value,
        correo: document.getElementById("email").value,
        telefono2: document.getElementById("phone_B").value,
        direccion2: document.getElementById("address_B").value,
        direccion: document.getElementById("address").value,
        tarifa: document.getElementById("fee").value,
        calificacion: document.getElementById("score").value
    } ;

    // Se consume la API o servicio creado en el BackEnd:
    fetch( "http://localhost:3000/Paseadores/addWalker", {
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

            msg = "ERROR: No fue posible crear el nuevo paseador: " + JSON.stringify(mm.info) ;

        // De lo contrario, se agrega el paseo y se notifica:    
        } else {

            msg = "Paseador creado con exito. " ;
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

// Función para actualizar la información del paseador:
function updateWalker() {

    // Se obtienen los datos ingresados en los campos, del paseador a ingresar:
    var data = {
        identificacion: document.getElementById("doc_number").value,    
        nombre: document.getElementById("name").value,
        documento: document.getElementById("doc_type").value,
        telefono: document.getElementById("phone").value,
        correo: document.getElementById("email").value,
        telefono2: document.getElementById("phone_B").value,
        direccion2: document.getElementById("address_B").value,
        direccion: document.getElementById("address").value,
        tarifa: document.getElementById("fee").value,
        calificacion: document.getElementById("score").value
    } ;

    // Se consulta sobre la actualización del paseador:
    var opc = confirm( "Esta seguro de modificar la info del paseador: " + document.getElementById("doc_number").value ) ;

    // Si la respuesta es afirmativa:
    if( opc == true ) {

        // Se consume la API o servicio creado en el BackEnd:
        fetch( "http://localhost:3000/Paseadores/updateWalker", {
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

                msg = "ERROR: No fue posible actualizar la info del paseador: " + JSON.stringify(mm.info) ;

            // De lo contrario, se actualizan los datos del paseador y se notifica:    
            } else {

                // Si el paseo existe:
                if( mm.info.modifiedCount > 0 ){
                    msg = "Paseador actualizado con exito: " ;
                    getWalkers() ;

                // Si el paseo no existe:
                } else {
                    msg = "El paseador x actualizar no existe" ;
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
        fillSet( rta ) ;

     } )

    // Si ocurre cualquier otro error, se notifica:
    .catch( (err) => { document.getElementById("new_message").innerHTML }) ;
}

// Función para rellenar el contenido de la tabla del HTML:
function fillSet( rta ) {

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

            // Se crea la celda para el tipo de documento:
            tdTId = document.createElement("td") ;
            tdTId.innerHTML = rta.info[i].Documento ;
            tr.appendChild( tdTId ) ;

            // Se crea la celda para el nombre:
            tdNom = document.createElement("td") ;
            tdNom.innerHTML = rta.info[i].Nombre ;
            tr.appendChild( tdNom ) ;

            // Se crea la celda para la teléfono:
            tdTel = document.createElement("td") ;
            tdTel.innerHTML = rta.info[i].Telefono ;
            tr.appendChild( tdTel ) ;

            // Se crea la celda para el correo:
            tdCor = document.createElement("td") ;
            tdCor.innerHTML = rta.info[i].Correo ;
            tr.appendChild( tdCor ) ;

            // Se crea la celda para el teléfono de la empresa:
            tdTel2 = document.createElement("td") ;
            tdTel2.innerHTML = rta.info[i].Telefono2 ;
            tr.appendChild( tdTel2 ) ;

            // Se crea la celda para la dirección de la empresa:
            tdDir2 = document.createElement("td") ;
            tdDir2.innerHTML = rta.info[i].Direccion2 ;
            tr.appendChild( tdDir2 ) ;

            // Se crea la celda para la dirección:
            tdDir = document.createElement("td") ;
            tdDir.innerHTML = rta.info[i].Direccion ;
            tr.appendChild( tdDir ) ;

            // Se crea la celda para la tarifa:
            tdTar = document.createElement("td") ;
            tdTar.innerHTML = rta.info[i].Tarifa ;
            tr.appendChild( tdTar ) ;

            // Se crea la celda para la calificación:
            tdCal = document.createElement("td") ;
            tdCal.innerHTML = rta.info[i].Calificacion ;
            tr.appendChild( tdCal ) ;

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
                document.getElementById("doc_type").value = rta.info[i].Documento ;
                document.getElementById("name").value = rta.info[i].Nombre ;
                document.getElementById("phone").value = rta.info[i].Telefono ;
                document.getElementById("email").value = rta.info[i].Correo ;
                document.getElementById("phone_B").value = rta.info[i].Telefono2 ;
                document.getElementById("address_B").value = rta.info[i].Direccion2 ;
                document.getElementById("address").value = rta.info[i].Direccion ;
                document.getElementById("fee").value = rta.info[i].Tarifa ;
                document.getElementById("score").value = rta.info[i].Calificacion ;
            } ;

            tdAcc.appendChild( icono ) ;
            tr.appendChild( tdAcc ) ;

            // Se agrega la fila a la tabla:
            mySet.appendChild( tr ) ;
        }
}