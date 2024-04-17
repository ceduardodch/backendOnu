const express = require('express');
const router = express.Router();
const pool = require('../db');
const cors = require('cors');

// Habilita CORS para todas las rutas
router.use(cors());

router.get('/:fileId', async (req, res) => {
  try {

    const files = await pool.query('SELECT file FROM public.files WHERE id = $1', [req.params.fileId]);
    const buffer = files.rows[0].file;
    const base64Data = buffer.toString('base64');

    // Asegúrate de que el archivo existe
    if (!base64Data) {
      return res.status(404).send('Archivo no encontrado');
    }

    // Asegúrate de que el archivo tiene un campo 'file' que contiene los datos binarios del archivo
    if (!file.file) {
      return res.status(500).send('El archivo no tiene datos');
    }

    // Convierte los datos binarios a una cadena base64

    // Envía la cadena base64 como respuesta
    res.json({ file: base64Data });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor: ' + err.message);
  }
});

router.post('/', async (req, res) => {
    const {
      name, file
    } = req.body;
  
    try {
      console.log('body', req.body);
      const buffer = Buffer.from(file, 'base64');
  
      // Insertar el nuevo usuario en la base de datos
      const newFile = await pool.query(
        'INSERT INTO public.files (name, file, created_at, updated_at) VALUES ($1, $2, NOW(), NOW()) RETURNING *',
        [name, buffer]
      );
  
      res.json({ msg: 'Archivo creado con éxito', file: newFile.rows[0].id });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error del servidor');
    }
  });





module.exports = router;

