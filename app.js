const express = require('express');
const userRoutes = require('./routes/users');
const importadorRoutes = require('./routes/importador');
const paisRoutes = require('./routes/pais');
const proveedorRoutes = require('./routes/proveedor');
const sustanciaRoutes = require('./routes/sustancia');
const anioRoutes = require('./routes/anio');
const cupoRoutes = require('./routes/cupo');
const gruposustRoutes = require('./routes/grupo_sust');
const importRoutes = require('./routes/importacion');

const app = express();

/*const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
*/
app.use(express.json()); // Para parsear JSON en el cuerpo de las peticiones

//app.use('/api/users', userRoutes);


app.use('/users', userRoutes);
app.use('/users/login', userRoutes);

app.use('/importadors', importadorRoutes);
app.use('/paises', paisRoutes);
app.use('/proveedors', proveedorRoutes);
app.use('/sustancias', sustanciaRoutes);
app.use('/anios', anioRoutes);
app.use('/gruposusts', gruposustRoutes);
app.use('/cupos', cupoRoutes);
app.use('/importacion', importRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
