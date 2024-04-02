const express = require('express');
const router = express.Router();
const pool = require('../db');
const cors = require('cors');

// Habilita CORS para todas las rutas
router.importador(cors());
// Obtener todos los importador
router.get('/', async (req, res) => {
    const { rows } = await pool.query('SELECT * FROM public.importador');
    res.send(rows);
  });

// Obtener un importador por su ID
router.get('/:id', (req, res) => {
  // Aquí iría la lógica para obtener un importador específico usando req.params.id
  res.send(`Detalle del importador con ID ${req.params.id}`);
});

router.post('/', async (req, res) => {
    const {
      id,name, ruc, user_import, created_at, updated_at
    } = req.body;
  
    try {
      // Verificar si el importador ya existe
      const { rows } = await pool.query('SELECT * FROM public.importador WHERE name = $1', [name]);
      if (rows.length > 0) {
        return res.status(400).json({ msg: 'El Importador ya existe' });
      }

      console.log('body', req.body);
  
      // Insertar el nuevo importador en la base de datos
      const newProve = await pool.query(
        'INSERT INTO public.importador (id,name, ruc, user_import, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [id,name, ruc, user_import, created_at, updated_at]
      );
  
      res.json({ msg: 'Importador creado con éxito', importador: newProve.rows[0] });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error del servidor');
    }
  });
  

// Actualizar un importador
router.put('/:id', (req, res) => {
  // Aquí iría la lógica para actualizar un importador específico con los datos enviados en req.body
  res.send(`Importador con ID ${req.params.id} actualizado`);
});

// Eliminar un importador
router.delete('/:id', (req, res) => {
  // Aquí iría la lógica para eliminar un importador específico usando req.params.id
  res.send(`Importador con ID ${req.params.id} eliminado`);
});

module.exports = router;
