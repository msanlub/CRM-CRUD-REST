![img/restruct.jpg](URL-de-la-imagen)


## Tabla de Contenidos

2. [Tecnologías Utilizadas](#tecnologías-utilizadas)
3. [Estructura del Código](#estructura-del-código)
4. [Flujo de la Aplicación](#flujo-de-la-aplicación)
5. [Funciones Principales](#funciones-principales)
6. [Manejo de Errores](#manejo-de-errores)
6. [Requisitos del proyecto con ejemplos de codigo](#requisitos-proyecto)


## Descripción General

La aplicación permite a los usuarios gestionar una lista de clientes. Los usuarios pueden agregar nuevos clientes, editar la información de los existentes y eliminar clientes de la base de datos. La información se almacena en IndexedDB, lo que permite el almacenamiento persistente en el navegador.

## Tecnologías Utilizadas

- HTML
- CSS
- JavaScript
- IndexedDB

## Estructura del Código

El código está estructurado de la siguiente manera:

- **Variables**: Se definen las variables que se utilizan en la aplicación, incluyendo elementos del DOM y el objeto `cliente`.
- **Eventos**: Se configuran los eventos para la validación de los campos y el manejo de formularios.
- **Funciones de Validación**: Se implementan funciones para validar los campos del formulario.
- **Funciones CRUD**: Se incluyen funciones para agregar, editar, eliminar y mostrar clientes desde la base de datos.

## Flujo de la Aplicación

1. **Carga de la Aplicación**: Cuando la página se carga (`DOMContentLoaded`), se inicializa la base de datos y se configuran los eventos para los campos del formulario.
2. **Validación de Datos**: Cada vez que un campo pierde el foco (evento `blur`), se valida su contenido. Si todos los campos son válidos, se habilita el botón de agregar cliente.
3. **Agregar o Editar Cliente**: Al enviar el formulario, se verifica si se está editando un cliente o si se está agregando uno nuevo. Dependiendo de eso, se llama a la función correspondiente.
4. **Almacenamiento en IndexedDB**: Los datos del cliente se almacenan en IndexedDB y se muestran en la interfaz de usuario.
5. **Manejo de Errores**: Si hay algún error durante la validación o el almacenamiento en la base de datos, se muestra un mensaje al usuario.

## Funciones Principales

`iniciarDB()`
- Inicializa la base de datos y crea el objeto de almacenamiento para los clientes.

`validarDatos(e)`
- Valida todos los campos del formulario. Si todos son válidos, agrega o edita el cliente.

`validarCampoNombre()`, `validarCampoEmail()`, `validarCampoTelefono()`, `validarCampoEmpresa()`
- Valida los campos individuales del formulario y devuelve un valor booleano.

`mostrarError(mensaje, campo)`
- Muestra un mensaje de error debajo del campo correspondiente.

`limpiarError(campo)`
- Limpia los mensajes de error de cada campo.

`agregarCliente(cliente)`
- Agrega un nuevo cliente a la base de datos después de verificar si ya existe.

`eliminarCliente(email)`
- Elimina un cliente de la base de datos y de la interfaz de usuario.

`mostrarClientesDB()`
- Crea los elementos necesarios para mostrar todos los clientes almacenados en la base de datos.

`cargarDatosCliente(email)`
- Carga los datos del cliente de la db en el sessionStorage para la edición.

`cargarFormularioEdicion()`
- Carga los datos del cliente del sessionStorage al formulario para editar.

`editarCliente(cliente)`
- Actualiza la información del cliente y lo guarda en el db.


## Manejo de Errores

La aplicación incluye un manejo básico de errores que muestra mensajes específicos al usuario cuando algo sale mal, como un correo electrónico o teléfono no válido, que el usuario ya existe o no se puede cargar la db.


## Requisitos proyecto

- Formulario nuevo cliente: Implementa validaciones completas en todos los campos del formulario, utilizando eventos 'onblur' para verificar la información en tiempo real. Además, resalta visualmente el campo activo donde el usuario se encuentra.

*Validaciones de datos y por cada campo, además de las funciones de mostrar errores por campos y limpiar los errores*

https://github.com/msanlub/CRM-CRUD-REST/blob/ca181030ca8dc4d58181c1a18d5395e420da195f/js/app.js#L62-L171
  
- Agregar cliente: El botón de agregar cliente solo debe activarse cuando todos los datos del formulario sean válidos. Al presionarlo, se añadirá el cliente al listado de clientes en el CRM.

*Botón agregar cliente*

https://github.com/msanlub/CRM-CRUD-REST/blob/ca181030ca8dc4d58181c1a18d5395e420da195f/js/app.js#L23

*Función de agregar el cliente una vez validado*

https://github.com/msanlub/CRM-CRUD-REST/blob/ca181030ca8dc4d58181c1a18d5395e420da195f/js/app.js#L199-L228
  
- Gestión de clientes: Implementa un listado dinámico que muestre todos los clientes añadidos. Debe ser posible editar y eliminar clientes del listado, asegurando que los cambios persistan en el navegador mediante IndexedDB.

*función que muestra al cliente y creación de elementos HTML*

https://github.com/msanlub/CRM-CRUD-REST/blob/ca181030ca8dc4d58181c1a18d5395e420da195f/js/app.js#L259-L307

*función que borra una vez presionado el botón previamente creado*

https://github.com/msanlub/CRM-CRUD-REST/blob/ca181030ca8dc4d58181c1a18d5395e420da195f/js/app.js#L234-L253

*función que cargar info de la db una vez presionado el botón previamente creado*

https://github.com/msanlub/CRM-CRUD-REST/blob/ca181030ca8dc4d58181c1a18d5395e420da195f/js/app.js#L313-L334

*función que carga la info de la db en el formulario para editarlo*

https://github.com/msanlub/CRM-CRUD-REST/blob/ca181030ca8dc4d58181c1a18d5395e420da195f/js/app.js#L373-L384

*función que edita el cliente y lo guarda en la bd*

https://github.com/msanlub/CRM-CRUD-REST/blob/ca181030ca8dc4d58181c1a18d5395e420da195f/js/app.js#L339-L368
  
- Persistencia de datos: Toda la información de los clientes debe mantenerse disponible en el navegador, incluso después de cerrarlo, utilizando IndexedDB para almacenar y recuperar los datos de manera eficiente.

Todas las funciones CRUD trabajan directamente en la base de datos, asegurando la persistencia de datos actualizados.
