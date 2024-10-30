// Variables
const formulario = document.querySelector("#formulario");
const listadoClientes = document.querySelector("#listado-clientes");
let cliente = {
    nombre: "",
    email: "",
    telefono: "",
    empresa: ""
};

let db;

// Eventos
document.addEventListener("DOMContentLoaded", () => {
    iniciarDB();
    formulario.addEventListener('submit', validarDatos);
});

document.getElementById("nombre").addEventListener("blur", validarCampoNombre);
document.getElementById("email").addEventListener("blur", validarCampoEmail);
document.getElementById("telefono").addEventListener("blur", validarCampoTelefono);
document.getElementById("empresa").addEventListener("blur", validarCampoEmpresa);

/**
 * Función para iniciar la base de datos 
 */
function iniciarDB() {
    //crea el almacen de la db y la version
    const request = indexedDB.open("CRMClientes", 1);

    //se dispara cuando se crea la estructura de la db o se incrementa la version
    request.onupgradeneeded = function(event) {
        const db = event.target.result;
        db.createObjectStore("clientes", { keyPath: "email" }); 
    };
    //exito al cargar la db
    request.onsuccess = function(event) {
        db = event.target.result;
        mostrarClientesDB(); 
    };

    //error al cargar la db
    request.onerror = function(event) {
        console.error("Error al abrir la base de datos:", event);
    };
}

/**
 * Validación para cada campo, una vez validado asigna los campos y llama a agregarCliente
 * @param {*} e 
 */
function validarDatos(e) {
    e.preventDefault(); 

    // Validar los campos
    const nombreValido = validarCampoNombre();
    const emailValido = validarCampoEmail();
    const telefonoValido = validarCampoTelefono();
    const empresaValido = validarCampoEmpresa();

    if (nombreValido && emailValido && telefonoValido && empresaValido) {
        cliente.nombre = document.getElementById("nombre").value.trim();
        cliente.email = document.getElementById("email").value.trim();
        cliente.telefono = document.getElementById("telefono").value.trim();
        cliente.empresa = document.getElementById("empresa").value.trim();

        agregarCliente(cliente);

        formulario.reset(); 
        limpiarCliente(); 
    }
}

// VALIDACIONES POR CAMPO
/**
 * Validación del campo nombre, devuelve true cuando no está vacío
 * @returns true 
 */
function validarCampoNombre() {
    limpiarError("nombre");
    const nombre = document.getElementById("nombre").value.trim();
    if (!nombre) {
        mostrarError("El campo nombre es obligatorio", "nombre");
        return false;
    }
    return true;
}

/**
 * Validación del campo email, devuelve true cuando es formato correcto
 * @returns true 
 */
function validarCampoEmail() {
    limpiarError("email");
    const email = document.getElementById("email").value.trim();
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
        mostrarError("El campo email no es válido", "email");
        return false;
    }
    return true;
}

/**
 * Validación del campo teléfono, devuelve true cuando es formato correcto
 * @returns true 
 */
function validarCampoTelefono() {
    limpiarError("telefono");
    const telefono = document.getElementById("telefono").value.trim();
    const telefonoRegex = /^\d{9}$/;
    if (!telefonoRegex.test(telefono) && telefono !== "") {
        mostrarError("El campo teléfono no es válido", "telefono");
        return false;
    }
    return true;
}

/**
 * Validación del campo empresa, devuelve true cuando no está vacío
 * @returns true 
 */
function validarCampoEmpresa() {
    limpiarError("empresa");
    const empresa = document.getElementById("empresa").value.trim();
    if (!empresa) {
        mostrarError("El campo empresa es obligatorio", "empresa");
        return false;
    }
    return true;
}

// ERRORES
/**
 * Muestra mensaje de error en cada campo
 * @param {String} mensaje 
 * @param {String} campo
 */
function mostrarError(mensaje, campo) {
    const campo = document.getElementById(campo);
    const error = document.createElement("p");
    error.textContent = mensaje;
    error.classList.add("error", "text-red-600", "text-sm");
    campo.parentElement.appendChild(error);
}

// LIMPIAR
/**
 * Limpia el mensaje de error de cada campo
 * @param {String} campo
 */
function limpiarError(campo) {
    const campo = document.getElementById(campo).parentElement;
    const error = campo.querySelector(".error");
    if (error) error.remove();
}

/**
 * Limpia el tbody de la tabla donde mostramos la información de cliente en el HTML
 */
function limpiarHTML() {
    while (listadoClientes.firstChild) {
        listadoClientes.removeChild(listadoClientes.firstChild);
    }
}

/**
 * Limpia el objeto cliente
 */
function limpiarCliente() { 
    cliente = {
        nombre: "",
        email: "",
        telefono: "",
        empresa: ""
    };
}

// CRUD DB
/**
 * Agrega cliente a la db, verificando por email existente
 * @param {Object} cliente 
 */
function agregarCliente(cliente) {
    const transaction = db.transaction(["clientes"], "readwrite");
    const store = transaction.objectStore("clientes");

    // Verificar si el cliente ya existe
    const request = store.get(cliente.email); 

    request.onsuccess = function(event) {
        const clienteExistente = event.target.result;

        if (clienteExistente) {
            alert("El cliente ya existe.");
        } else {
            const addRequest = store.add(cliente);

            addRequest.onsuccess = function() {
                console.log("Cliente agregado:", cliente);
                mostrarClientesDB(); 
            };

            addRequest.onerror = function(event) {
                console.error("Error al agregar el cliente:", event.target.error);
            };
        }
    };

    request.onerror = function(event) {
        console.error("Error al verificar el cliente:", event.target.error);
    };
}

/**
 * Edita el cliente modificando los campos
 * @param {Object} cliente 
 */
function editarCliente(cliente) {
    const transaction = db.transaction(["clientes"], "readwrite");
    const store = transaction.objectStore("clientes");

    const request = store.put(cliente);

    request.onsuccess = function() {
        console.log("Cliente actualizado:", cliente);
        mostrarClientesDB(); 
    };

    request.onerror = function(event) {
        console.error("Error al actualizar el cliente:", event.target.error);
        alert("Error al actualizar el cliente. Intenta nuevamente.");
    };
}

/**
 * Elimina cliente de la db
 * @param {String} email 
 */
function eliminarCliente(email) {
    const transaction = db.transaction(["clientes"], "readwrite");
    const store = transaction.objectStore("clientes");
    store.delete(email); 

    transaction.onsuccess = function() {
        console.log("Cliente eliminado", email);
        mostrarClientesDB();
    };
}

/**
 * Crea los elementos necesarios para mostrar el cliente en el HTML, obteniendo datos de la db
 */
function mostrarClientesDB() {
    const transaction = db.transaction(["clientes"], "readonly");
    const store = transaction.objectStore("clientes");
    const request = store.getAll();

    request.onsuccess = function(event) {
        const clientes = event.target.result;
        limpiarHTML();

        clientes.forEach(cliente => {
            const fila = document.createElement("tr");

            const nombreCelda = document.createElement("td");
            nombreCelda.classList.add("border", "px-4", "py-2");
            nombreCelda.textContent = cliente.nombre;
            fila.appendChild(nombreCelda);

            const telefonoCelda = document.createElement("td");
            telefonoCelda.classList.add("border", "px-4", "py-2");
            telefonoCelda.textContent = cliente.telefono;
            fila.appendChild(telefonoCelda);

            const empresaCelda = document.createElement("td");
            empresaCelda.classList.add("border", "px-4", "py-2");
            empresaCelda.textContent = cliente.empresa;
            fila.appendChild(empresaCelda);

            const botonesCelda = document.createElement("td");
            botonesCelda.classList.add("border", "px-4", "py-2");

            const botonEditar = document.createElement("button");
            botonEditar.classList.add("bg-yellow-500", "hover:bg-yellow-700", "text-white", "font-bold", "py-1", "px-2", "rounded");
            botonEditar.textContent = "Editar";
            botonEditar.onclick = () => cargarDatosCliente(cliente.email); 
            botonesCelda.appendChild(botonEditar);

            const botonEliminar = document.createElement("button");
            botonEliminar.classList.add("bg-red-500", "hover:bg-red-700", "text-white", "font-bold", "py-1", "px-2", "rounded", "ml-2");
            botonEliminar.textContent = "Eliminar";
            botonEliminar.onclick = () => eliminarCliente(cliente.email); 
            botonesCelda.appendChild(botonEliminar);

            fila.appendChild(botonesCelda);
            listadoClientes.appendChild(fila);
        });
    };
}

/**
 * Carga los datos de cliente de la db para editarlos
 * @param {String} email 
 */
function cargarDatosCliente(email) {
    const transaction = db.transaction(["clientes"], "readonly");
    const store = transaction.objectStore("clientes");
    const request = store.get(email);

    request.onsuccess = function(event) {
        const cliente = event.target.result;

        // Asignar los valores al formulario
        document.getElementById("nombre").value = cliente.nombre;
        document.getElementById("email").value = cliente.email;
        document.getElementById("telefono").value = cliente.telefono;
        document.getElementById("empresa").value = cliente.empresa;
    };
}




