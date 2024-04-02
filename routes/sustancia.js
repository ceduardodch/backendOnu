const express = require('express');
const router = express.Router();
const pool = require('../db');
const cors = require('cors');

// Habilita CORS para todas las rutas
router.use(cors());
// Obtener todos los Sustancias
router.get('/', async (req, res) => {
    const { rows } = await pool.query('SELECT * FROM public.sustancia');
    res.send(rows);
  });

// Obtener un Sustancia por su ID
router.get('/:id', (req, res) => {
  // Aquí iría la lógica para obtener un Sustancia específico usando req.params.id
  res.send(`Detalle del Sustancia con ID ${req.params.id}`);
});

router.post('/', async (req, res) => {
    const {
        name, subpartida, pao, pcg, grupo_sust, activo, cupo_prod
    } = req.body;
  
    try {
      // Verificar si el Sustancia ya existe
      const { rows } = await pool.query('SELECT * FROM public.sustancia WHERE name = $1', [name]);
      if (rows.length > 0) {
        return res.status(400).json({ msg: 'La Sustancia ya existe' });
      }

      console.log('body', req.body);
  
      // Insertar el nuevo Sustancia en la base de datos
      const newSust = await pool.query(
        'INSERT INTO public.sustancia (name, subpartida, pao, pcg, grupo_sust, activo, cupo_prod, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW()) RETURNING *',
        [name, subpartida, pao, pcg, grupo_sust, activo, cupo_prod]
      );
  
      res.json({ msg: 'Sustancia creado con éxito', sustancia: newSust.rows[0] });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error del servidor');
    }
  });
  

// Actualizar un Sustancia
router.put('/:id', (req, res) => {
  // Aquí iría la lógica para actualizar un Sustancia específico con los datos enviados en req.body
  res.send(`Sustancia con ID ${req.params.id} actualizado`);
});

// Eliminar un Sustancia
router.delete('/:id', (req, res) => {
  // Aquí iría la lógica para eliminar un Sustancia específico usando req.params.id
  res.send(`Sustancia con ID ${req.params.id} eliminado`);
});

module.exports = router;
