import { Router } from "express";
import { cartController } from "../controller/cartController.js";
const cartRouter = Router();

cartRouter.post('/', cartController.saveCart); // Creamos un carrito
cartRouter.delete('/:id', cartController.deleteCart); // Elimina un carrito
cartRouter.get('/:id/productos', cartController.getProducts); // Traemos todos los productos del carrito
cartRouter.post('/:id/productos', cartController.saveProductByID); // Agregamos productos al carrito desde el id
cartRouter.delete('/:id/productos/:id_producto', cartController.deleteCartProductByID); // Eliminamos un producto especifico de un carrito especifico mediante ids

export default cartRouter;