const express = require('express');
const router = express.Router();
const pool = require('../db');
const cors = require('cors');

// Habilita CORS para todas las rutas
router.use(cors());
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
      name, ruc, user_import
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
        'INSERT INTO public.importador (name, ruc, user_import, created_at, updated_at) VALUES ($1, $2, $3,NOW(), NOW()) RETURNING *',
        [name, ruc, user_import]
      );
  
      res.json({ msg: 'Importador creado con éxito', importador: newProve.rows[0] });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error del servidor');
    }
  });
  

// Actualizar un importador
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, ruc, user_import} = req.body;

  try {
      const updateQuery = `
          UPDATE public.importador
          SET name = $1, ruc = $2, user_import = $3, updated_at = NOW()
          WHERE id = $4
          RETURNING *;
      `;
      const { rows } = await pool.query(updateQuery, [name, ruc, user_import, id]);
      //const rows = result.rows;

      if (rows.length === 0) {
          return res.status(404).json({ msg: 'importador no encontrado' });
      }

      res.json({ msg: 'importador actualizado', importador: rows[0] });
  } catch (err) {
      console.error(err.message);
      res.status(500).json({msg: 'Server Error'});
  }
});


// Eliminar un importador

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
      const deleteQuery = 'DELETE FROM public.importador WHERE id = $1;';
      const result = await pool.query(deleteQuery, [id]);

      if (result.rowCount === 0) {
          return res.status(404).json({ msg: 'importador no encontrado' });
      }

      res.json({ msg: 'importador eliminado con éxito' });
  } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Error del servidor' });
  }
});


// Buscar importadores por nombre
router.get('/search', async (req, res) => {
  const { name } = req.query; // Obtén el nombre del query string

  try {
      const searchQuery = 'SELECT * FROM public.importador WHERE name ILIKE $1';
      const { rows } = await pool.query(searchQuery, [`%${name}%`]); // Usar ILIKE para búsqueda insensible a mayúsculas/minúsculas
      
      if (rows.length === 0) {
          return res.status(404).json({ msg: 'No se encontraron importadores con ese nombre' });
      }

      res.json(rows);
  } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Error del servidor' });
  }
});

module.exports = router;
