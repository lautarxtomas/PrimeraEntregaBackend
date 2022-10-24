import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import productsRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartRoutes.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 8080

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('port', PORT);
app.use('/api/productos', productsRouter);
app.use('/api/carrito', cartRouter);

const server = app.listen(PORT, () => {
    console.log('server connected on port:', app.get('port'))
});
server.on('error', error => console.log(`Error en el servidor: ${error}`));

export default app;