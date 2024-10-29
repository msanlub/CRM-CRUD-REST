
export function iniciarDB() {
    const request = indexedDB.open("CRMClientes", 1);

    request.onupgradeneeded = function(event) {
        const db = event.target.result;
        db.createObjectStore("clientes", { keyPath: "id", autoIncrement: true });
    };

    request.onsuccess = function(event) {
        db = event.target.result;
        
        cargarClientesDesdeJSON();
        mostrarClientesDB();
    };

    request.onerror = function(event) {
        console.error("Error al abrir la base de datos:", event);
    };
}

export function cargarClientesDesdeJSON() {
    fetch('db.json') 
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }
            return response.json();
        })
        .then(data => {
            data.clientes.forEach(cliente => {
                agregarCliente(cliente);
            });
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

export function mostrarClientesDB() {
    const transaction = db.transaction(["clientes"], "readonly");
    const store = transaction.objectStore("clientes");
    const request = store.getAll();

    request.onsuccess = function(event) {
        const clientes = event.target.result;
        const listaClientes = document.getElementById("lista-clientes"); 

        limpiarHTML();

        clientes.forEach(cliente => {
            const li = document.createElement("li");
            li.textContent = `Nombre: ${cliente.nombre}, Email: ${cliente.email}, Teléfono: ${cliente.telefono}, Empresa: ${cliente.empresa}`;
            listaClientes.appendChild(li);
        });
    };
}

