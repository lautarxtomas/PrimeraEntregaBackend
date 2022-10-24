# Primera entrega del proyecto final - Curso backend Coderhouse

## Para inicializar el proyecto ejecute en la terminal:
**npm install**

y luego:  

**npm run start**

### Funcionalidades del router base 'api/productos':

- GET: '/:id?' ----> Permite listar todos los elementos o un producto por su ID (Disponible para usuarios y administradores).
- POST: '/' ----> Para incorporar productos al listado (Disponible para administradores).
- PUT: '/:id' ----> Actualiza un producto por su ID (Disponible para administradores).
- DELETE: '/:id' ----> Borra un producto por su ID (Disponible para administradores).

### Funcionalidades del router base 'api/carrito':

- POST: '/' ----> Crea un carrito y nos devuelve su ID.
- DELETE '/:id' ----> Vacía un carrito y lo elimina.
- GET: '/:id/productos' ----> Me permite listar todos los productos guardados en el carrito.
- POST: '/:id/productos/' ----> Para incorporar productos al carrito por su ID de producto. (Para seleccionar qué productos queremos ingresar debemos agregar en el body un array (arrayProductsIds) con los IDs de los productos que queremos agregar.)
- DELETE: '/:id/productos/:id_prod' ----> Eliminar un producto del carrito por su ID de carrito y de producto.

### Proyecto subido a glitch:
https://primera-entrega-pf-julianlobos.glitch.me
