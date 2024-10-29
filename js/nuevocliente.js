import { validarDatos, limpiarErrores, agregarCliente } from './funciones.js'; // Ajusta la ruta si es necesario
import { initDB, mostrarClientesDB } from './api.js';

// variables
const formulario = document.querySelector("#formulario");
const cliente = {
    nombre: "",
    email: "",
    telefono: "",
    empresa: ""
};

// Eventos
document.addEventListener("DOMContentLoaded", () => {
    initDB(); 
    mostrarClientesDB(); 
});

formulario.addEventListener('submit', (e) => {
    validarDatos(e); 
});

document.getElementById("nombre").addEventListener("blur", validarDatos);
document.getElementById("email").addEventListener("blur", validarDatos);
document.getElementById("telefono").addEventListener("blur", validarDatos);
document.getElementById("empresa").addEventListener("blur", validarDatos);
