const express = require('express');
const router = express.Router();
const pool = require('../db');
const cors = require('cors');

// Habilita CORS para todas las rutas
router.use(cors());
// Obtener todos los usuarios
router.get('/', async (req, res) => {
    const { rows } = await pool.query('SELECT * FROM public.user');
    res.send(rows);
  });

// Obtener un usuario por su ID
router.get('/:id', (req, res) => {
  // Aquí iría la lógica para obtener un usuario específico usando req.params.id
  res.send(`Detalle del usuario con ID ${req.params.id}`);
});

router.post('/', async (req, res) => {
    const {
      id,name, email, phone, company, password, address, created_at, updated_at
    } = req.body;
  
    try {
      // Verificar si el usuario ya existe
      const { rows } = await pool.query('SELECT * FROM public.user WHERE email = $1', [email]);
      if (rows.length > 0) {
        return res.status(400).json({ msg: 'El usuario ya existe' });
      }

      console.log('body', req.body);
  
      // Insertar el nuevo usuario en la base de datos
      const newUser = await pool.query(
        'INSERT INTO public.user (id,name, email, phone, company, password, address, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
        [id,name, email, phone, company, password, address, created_at, updated_at]
      );
  
      res.json({ msg: 'Usuario creado con éxito', user: newUser.rows[0] });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error del servidor');
    }
  });
  

// Actualizar un usuario
router.put('/:id', (req, res) => {
  // Aquí iría la lógica para actualizar un usuario específico con los datos enviados en req.body
  res.send(`Usuario con ID ${req.params.id} actualizado`);
});

// Eliminar un usuario
router.delete('/:id', (req, res) => {
  // Aquí iría la lógica para eliminar un usuario específico usando req.params.id
  res.send(`Usuario con ID ${req.params.id} eliminado`);
});

module.exports = router;
