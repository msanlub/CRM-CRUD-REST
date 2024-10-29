export function validarDatos(e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const telefono = document.getElementById("telefono").value;
    const empresa = document.getElementById("empresa").value;

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const telefonoRegex = /^\d{9}$/;

    // Validaciones
    let esValido = true;

    limpiarErrores();

    if (nombre === "") {
        mostrarError("El campo nombre es obligatorio", document.getElementById("nombre"));
        esValido = false;
    }else {
        limpiarError(document.getElementById("nombre")); 
    }

    if (empresa === "") {
        mostrarError("El campo empresa es obligatorio", document.getElementById("empresa"));
        esValido = false;
    }else {
        limpiarError(document.getElementById("empresa"));
    }

    if (!emailRegex.test(email)) {
        mostrarError("El campo email no es válido", document.getElementById("email"));
        esValido = false;
    }limpiarError(document.getElementById("email"));

    if (!telefonoRegex.test(telefono)) {
        mostrarError("El campo teléfono no es válido", document.getElementById("telefono"));
        esValido = false;
    }limpiarError(document.getElementById("telefono"));

    document.querySelector("input[type='submit']").disabled = !esValido;

    //asignaciones si esta todo ok
    if (esValido) {
        cliente.nombre = nombre;
        cliente.email = email;
        cliente.telefono = telefono;
        cliente.empresa = empresa;

        agregarCliente(cliente);
        formulario.reset();
        document.querySelector("input[type='submit']").disabled = true; 
    }
}

export function mostrarError(mensaje, campo) {
    limpiarError(campo);

    const error = document.createElement("p");
    error.textContent = mensaje;
    error.classList.add("error", "text-red-600", "text-sm");
    campo.parentElement.appendChild(error);
}

export function limpiarError(campo) {
    const error = campo.parentElement.querySelector(".error");
    if (error) {
        error.remove();
    }
}

export function limpiarErrores() {
    const errores = document.querySelectorAll(".error");
    errores.forEach(error => error.remove());
    const campos = document.querySelectorAll("input");
    campos.forEach(campo => campo.classList.remove("error-input"));
}

export function agregarCliente(cliente) {
    console.log("cliente agregado: " + cliente.nombre)
    const transaction = db.transaction(["clientes"], "readwrite");
    const store = transaction.objectStore("clientes");
    store.add(cliente);

    transaction.onsuccess = function() {
        console.log("Cliente agregado:", cliente);
    };
}

export function limpiarHTML(){
    while (formulario.firstChild){
        formulario.removeChild(formulario.firstChild)
    }
}