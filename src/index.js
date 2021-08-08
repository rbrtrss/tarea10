/* eslint-disable import/extensions */
/* eslint-disable no-console */
import express from 'express';
import path from 'path';
import handlebars from 'express-handlebars';
import routerProductos from './routes/productos_routes.js';

// Servidor
const PORT = 8080;
const app = express();

// const layoutsPath = path.resolve(__dirname, '../views/layouts');
const hbs = handlebars({
  extname: 'hbs',
  defaultLayout: path.resolve(__dirname, '../views/layouts/index.hbs'),
  layoutsDir: path.resolve(__dirname, '../views/layouts'),
  partialsDir: path.resolve(__dirname, '../views/partials'),
});

app.engine('hbs', hbs);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, '../views'));

const server = app.listen(PORT, () => {
  console.log(`Levantado en el puerto ${PORT}`);
});

server.on('error', (err) => {
  console.error('Hubo un error:', err);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

app.use('/api/productos', routerProductos);
