const express = require('express');
const userRoutes = require('./routes/users');
const importadorRoutes = require('./routes/importador');
const paisRoutes = require('./routes/pais');
const proveedorRoutes = require('./routes/proveedor');
const sustanciaRoutes = require('./routes/sustancia');

const app = express();

app.use(express.json()); // Para parsear JSON en el cuerpo de las peticiones

app.use('/users', userRoutes);
app.use('/importadors', importadorRoutes);
app.use('/paises', paisRoutes);
app.use('/proveedors', proveedorRoutes);
app.use('/sustancias', sustanciaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
