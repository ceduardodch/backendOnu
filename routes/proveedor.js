const express = require('express');
const router = express.Router();
const pool = require('../db');
const cors = require('cors');

// Habilita CORS para todas las rutas
router.use(cors());
// Obtener todos los usuarios
router.get('/', async (req, res) => {
    const { rows } = await pool.query('SELECT * FROM public.proveedor');
    res.send(rows);
  });

// Obtener un usuario por su ID
router.get('/:id', (req, res) => {
  // Aquí iría la lógica para obtener un usuario específico usando req.params.id
  res.send(`Detalle del proveedor con ID ${req.params.id}`);
});

router.post('/', async (req, res) => {
    const {
      id,name, country, activo, created_at, updated_at
    } = req.body;
  
    try {
      // Verificar si el usuario ya existe
      const { rows } = await pool.query('SELECT * FROM public.proveedor WHERE name = $1', [name]);
      if (rows.length > 0) {
        return res.status(400).json({ msg: 'El proveedor ya existe' });
      }

      console.log('body', req.body);
  
      // Insertar el nuevo usuario en la base de datos
      const newProve = await pool.query(
        'INSERT INTO public.proveedor (id,name, country, activo, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [id,name, country, activo, created_at, updated_at]
      );
  
      res.json({ msg: 'Proveedor creado con éxito', proveedor: newProve.rows[0] });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error del servidor');
    }
  });
  

// Actualizar un usuario
router.put('/:id', (req, res) => {
  // Aquí iría la lógica para actualizar un usuario específico con los datos enviados en req.body
  res.send(`Proveedor con ID ${req.params.id} actualizado`);
});

// Eliminar un usuario
router.delete('/:id', (req, res) => {
  // Aquí iría la lógica para eliminar un usuario específico usando req.params.id
  res.send(`Proveedor con ID ${req.params.id} eliminado`);
});

module.exports = router;
