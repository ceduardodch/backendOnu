const express = require('express');
const router = express.Router();
const pool = require('../db');
const cors = require('cors');

// Habilita CORS para todas las rutas
router.pais(cors());
// Obtener todos los paiss
router.get('/', async (req, res) => {
    const { rows } = await pool.query('SELECT * FROM public.pais');
    res.send(rows);
  });

// Obtener un pais por su ID
router.get('/:id', (req, res) => {
  // Aquí iría la lógica para obtener un pais específico usando req.params.id
  res.send(`Detalle del pais con ID ${req.params.id}`);
});

router.post('/', async (req, res) => {
    const {
      id,name, created_at, updated_at
    } = req.body;
  
    try {
      // Verificar si el pais ya existe
      const { rows } = await pool.query('SELECT * FROM public.pais WHERE name = $1', [name]);
      if (rows.length > 0) {
        return res.status(400).json({ msg: 'El pais ya existe' });
      }

      console.log('body', req.body);
  
      // Insertar el nuevo pais en la base de datos
      const newPais = await pool.query(
        'INSERT INTO public.pais (id,name, created_at, updated_at) VALUES ($1, $2, $3, $4) RETURNING *',
        [id,name, created_at, updated_at]
      );
  
      res.json({ msg: 'Pais creado con éxito', pais: newPais.rows[0] });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error del servidor');
    }
  });
  

// Actualizar un pais
router.put('/:id', (req, res) => {
  // Aquí iría la lógica para actualizar un pais específico con los datos enviados en req.body
  res.send(`Pais con ID ${req.params.id} actualizado`);
});

// Eliminar un pais
router.delete('/:id', (req, res) => {
  // Aquí iría la lógica para eliminar un pais específico usando req.params.id
  res.send(`Pais con ID ${req.params.id} eliminado`);
});

module.exports = router;
