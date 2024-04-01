const express = require('express');
const userRoutes = require('./routes/users');

const app = express();

app.use(express.json()); // Para parsear JSON en el cuerpo de las peticiones

app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
