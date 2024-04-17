const express = require('express');
const router = express.Router();
const pool = require('../db');
const cors = require('cors');

// Habilita CORS para todas las rutas
router.use(cors());

router.get('/:fileId', async (req, res) => {
    try {
      const files = await pool.query('SELECT * FROM public.files WHERE id = $1', [req.params.fileId]);
      res.json(files.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error del servidor'+err.message);
    }
  });

router.post('/', async (req, res) => {
    const {
      name, file
    } = req.body;
  
    try {
      console.log('body', req.body);
  
      // Insertar el nuevo usuario en la base de datos
      const newFile = await pool.query(
        'INSERT INTO public.files (name, file, created_at, updated_at) VALUES ($1, $2, NOW(), NOW()) RETURNING *',
        [name, file]
      );
  
      res.json({ msg: 'Archivo creado con éxito', file: newFile.rows[0].id });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error del servidor');
    }
  });





module.exports = router;

