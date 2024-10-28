# 
# BASICS
**Aquí se establece la conexión a la base de datos y se manejan los eventos de éxito y error.**


``` js 
const dbNombre = "MiBaseDeDatos";

const dbVersion = 1;
```

 - Abrir (o crear) una base de datos (la conexión)

```js
const request = indexedDB.open(dbNombre, dbVersion);
``` 

- Manejo del éxito, contiene la referencia a la bd abierta

``` js
request.onsuccess = (event) => {
  const db = event.target.result;
  // Usar la base de datos
};
```
- Manejo de errores al abrir la BD
 
```js
request.onerror = (e) => {
  console.error("Error en la base de datos: " + e.target.error);
};
```
# 
# Error Handling
### Manejo de Errores: 
**Se gestionan errores durante las operaciones.**


```js
request.onerror = (event) => {
  console.error("Error: " + event.target.error);
};

transaction.onerror = (event) => {
  console.error("Error en la transacción: " + event.target.error);
};
```

#
# Database and Object Store Operations
### Operaciones para crear y actualizar la Base de Datos y Almacén de Objetos: 
**Se crean almacenes de objetos e índices, y se puede eliminar un almacén existente (similares a tablas en bases de datos relacionales).**


- Crear un almacén de objetos y un indice ( la estructura de la bd ), con el nombre del indice y nombre de la propiedad del objeto a usar

```js
request.onupgradeneeded = (e) => {
  const db = e.target.result;
  const objectStore = db.createObjectStore
  ("nuevoAlmacen", { keyPath: "id" });
  objectStore.createIndex("nombreIndice", "nombre", { unique: false });
};
```

- Eliminar un almacén de objetos

```js
db.deleteObjectStore("nombreDelAlmacen"); 
```

### Ejemplo de creación de una Base de Datos
``` js

const dbName = "MiBaseDeDatos";
const dbVersion = 1;

// Crea conexión a la bbdd
const request = indexedDB.open(dbName, dbVersion);

// Si no existe la base de datos o es una versión diferente dispara el evento para crear la estructura
request.onupgradeneeded = (event) => {
  const db = event.target.result;

  // Crear un object store (equivalente a una tabla)
  const nuevaTabla = db.createObjectStore("nuevoAlmacen", { keyPath: "id", autoIncrement: true });

  // Crear índices (equivalentes a columnas)
  nuevaTabla.createIndex("nombre", "nombre", { unique: false });
  nuevaTabla.createIndex("email", "email", { unique: true });

  console.log("Base de datos creada y estructura definida");
};

request.onsuccess = (event) => {
  console.log("Conexión a la base de datos establecida con éxito");
};

request.onerror = (event) => {
  console.error("Error al abrir la base de datos:", event.target.error);
};
```
#
# Data Manipulation
### Manipulación de Datos: 
**Se agregan, actualizan, eliminan y obtienen registros del almacén de objetos(CRUD)**


```js
const transaction = db.transaction(["nuevoAlmacen"], "readwrite");
const objectStore = transaction.objectStore("nuevoAlmacen");
```
-> db es la referencia a la base de datos.

-> transaction() inicia una nueva transacción.

-> ["nuevoAlmacen"] es un array con los nombres de los object stores que la transacción va a acceder,pudiendo poner varios.

-> "readwrite" especifica el modo de la transacción. Permite leer y escribir datos.

#
- Agregar datos
```js
const request = objectStore.add({ id: 1, nombre: "almacen_1", email: "almacen_1@example.com" });
 ```

- Actualizar datos
```js
const request = objectStore.put({ id: 1, nombre: "almacen_1", email: "almacen_1@example.com" });
```
- Eliminar datos
```js
const request = objectStore.delete(1);
```
- Obtener datos por indice
```js
const request = objectStore.get(1);

request.onsuccess = (event) => {
  console.log(request.result);
};
```

# Querying Data
### Consulta de Datos: 
**Se utilizan índices para realizar búsquedas y se abre un cursor para iterar sobre los registros.**

- Obtener datos por indice o nombre
```js
const index = objectStore.index("nombre");
const request = index.get("almacen_1");
 ```
- Crear cursor para iterar sobre los datos
```js
const request = objectStore.openCursor(); 
request.onsuccess = (event) => {
  const cursor = event.target.result;
  if (cursor) {
    console.log(cursor.value);
    cursor.continue(); //siguiente registro
  }
};
```

#
# Transactions
### Transacciones: 
**Se manejan transacciones para asegurar la integridad de las operaciones.**

```js
const transaction = db.transaction(["almacen_1", "inventario"], "readwrite");

transaction.oncomplete = (event) => {
  console.log("Transacción completada");
};
```

# 
# Advanced Operations
### Operaciones Avanzadas: 
**Se cuentan los registros y se crean rangos de claves para consultas más específicas.**

- Contar objetos en un almacen
```js
const request = objectStore.count();
``` 
- Crea un rango de claves y abre un cursor para iterar en ellas
```js
const keyRangeValue = IDBKeyRange.bound("A", "F");

const request = objectStore.openCursor(keyRangeValue);
```



# 
# Closing the Database
### Cierre de la Base de Datos: 
**Se cierra la conexión a la base de datos cuando ya no es necesaria.**


```js
db.close(); 
```

# 
# Deleting a Database
### Eliminación de una Base de Datos: 
**Se elimina una base de datos específica.**

```js
const request = indexedDB.deleteDatabase(dbNombre); 

request.onsuccess = () => console.log("Base de datos eliminada con éxito");
```


