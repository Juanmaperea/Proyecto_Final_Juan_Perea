
// Función para consultar un dueño de acuerdo a su Id:
function getOwner() {

    // Se obtiene el Id del dueño ingresado en el campo dispuesto para ello y se guarda en una variable:
    var data = {
        search_doc_number: document.getElementById("search_doc_number").value
    } ;

    // Se consume la API o servicio creado en el BackEnd:
    fetch( "http://localhost:3000/Duenos/getOwner", {
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
                document.getElementById("phone").value = mm.info[0].Telefono ;
                document.getElementById("address").value = mm.info[0].Direccion ;
                document.getElementById("email").value = mm.info[0].Correo ;

            // Si la respuesta es un arreglo vacío:
            } else {
                alert( "Dueño no existe" ) ;
            }
        }
     } )

     // Si ocurre cualquier otro error, se notifica:
    .catch( (err) => { 
        document.getElementById("new_message").innerHTML = "ERROR:" + err ;
    }) ;

}

// Función para eliminar un dueño de acuerdo a su Id:
function deleteOwner() {

    // Se obtiene el Id del dueño ingresado en el campo dispuesto para ello y se guarda en una variable:
    var data = {
        search_doc_number: document.getElementById("search_doc_number").value
    } ;

    // Se consulta sobre la eliminación del dueño:
    var opc = confirm( "Esta seguro de eliminar al dueño: " + document.getElementById("search_doc_number").value ) ;

    // Si la respuesta es afirmativa:
    if( opc == true ) {

        // Se consume la API o servicio creado en el BackEnd:
        fetch( "http://localhost:3000/Duenos/deleteOwner", {
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
            
            // De lo contrario, se elimina al dueño de acuerdo al Id ingresado y se notifica:
            } else {

                document.getElementById("new_message").innerHTML = "Dueño eliminado del sistema: " + JSON.stringify(mm.info) ;
                getOwners() ;
                alert( "Dueño eliminado" ) ;
            }

        } )

        // Si ocurre cualquier otro error, se notifica:
        .catch( (err) => {
            document.getElementById("new_message").innerHTML = "ERROR:" + err ;
         }) ;
    }
    
}

// Función para ingresar un nuevo dueño:
function addOwner() {

    // Se obtienen los datos ingresados en los campos, del dueño a ingresar:
    var data = {
        identificacion: document.getElementById("doc_number").value,    
        nombre: document.getElementById("name").value,
        telefono: document.getElementById("phone").value,
        direccion: document.getElementById("address").value,
        correo: document.getElementById("email").value
    } ;

    // Se consume la API o servicio creado en el BackEnd:
    fetch( "http://localhost:3000/Duenos/addOwner", {
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

            msg = "ERROR: No fue posible crear el nuevo dueño: " + JSON.stringify(mm.info) ;

        // De lo contrario, se agrega al dueño y se notifica:    
        } else {

            msg = "Dueño creado con exito. " ;
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

// Función para actualizar la información de un dueño:
function updateOwner() {

    // Se obtienen los datos ingresados en los campos, del dueño a ingresar:
    var data = {
        identificacion: document.getElementById("doc_number").value,    
        nombre: document.getElementById("name").value,
        telefono: document.getElementById("phone").value,
        direccion: document.getElementById("address").value,
        correo: document.getElementById("email").value
    } ;

    // Se consulta sobre la actualización del dueño:
    var opc = confirm( "Esta seguro de modificar la info del dueño: " + document.getElementById("doc_number").value ) ;

    // Si la respuesta es afirmativa:
    if( opc == true ) {

        // Se consume la API o servicio creado en el BackEnd:
        fetch( "http://localhost:3000/Duenos/updateOwner", {
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

                msg = "ERROR: No fue posible actualizar la info del dueño: " + JSON.stringify(mm.info) ;

            // De lo contrario, se actualizan los datos del dueño y se notifica:    
            } else {

                // Si el dueño existe:
                if( mm.info.modifiedCount > 0 ){
                    msg = "Dueño actualizado con exito: " ;
                    getOwners() ;

                // Si el dueño no existe:
                } else {
                    msg = "El dueño x actualizar no existe" ;
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

// Función para obtener todos los dueños registrados:
function getOwners() {

    // Se consume la API o servicio creado en el BackEnd:
    fetch( "http://localhost:3000/Duenos/getOwners", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    } )

    // Se procesa la respuesta obtenida de la solicitud hecha anteriormente:
    .then( (rta1) => { return( rta1.json() ) } )
    .then( (rta) => { 

        console.log( "=======>" + JSON.stringify(rta) ) ;
        
        // Se ejecuta la función fillSet para rellenar la tabla creada con los datos de los dueños:
        fillSet( rta ) ;

     } )

    // Si ocurre cualquier otro error, se notifica:
    .catch( (err) => { document.getElementById("new_message").innerHTML }) ;
}

// Función para rellenar el contenido de la tabla del HTML:
function fillSet( rta ) {

    // Se define la tabla a modificar:
    var mySet = document.getElementById("set_owners").querySelector("tbody") ;

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

            // Se crea la celda para el telefono:
            tdTel = document.createElement("td") ;
            tdTel.innerHTML = rta.info[i].Telefono ;
            tr.appendChild( tdTel ) ;

            // Se crea la celda para la dirección:
            tdDir = document.createElement("td") ;
            tdDir.innerHTML = rta.info[i].Direccion ;
            tr.appendChild( tdDir ) ;

            // Se crea la celda para el correo:
            tdCor = document.createElement("td") ;
            tdCor.innerHTML = rta.info[i].Correo ;
            tr.appendChild( tdCor ) ;

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
                document.getElementById("phone").value = rta.info[i].Telefono ;
                document.getElementById("address").value = rta.info[i].Direccion ;
                document.getElementById("email").value = rta.info[i].Correo ;
            } ;

            tdAcc.appendChild( icono ) ;
            tr.appendChild( tdAcc ) ;

            // Se agrega la fila a la tabla:
            mySet.appendChild( tr ) ;
        }
}