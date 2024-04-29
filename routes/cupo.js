const express = require('express');
const router = express.Router();
const pool = require('../db');
const cors = require('cors');

// Habilita CORS para todas las rutas
router.use(cors());
// Obtener todos los Cupos
router.get('/', async (req, res) => {
    const { rows } = await pool.query('SELECT * FROM public.cupo');
    res.send(rows);
  });



//busqueda
router.get('/:id', async (req, res) => {
  const { 
    id  
  } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM public.cupo WHERE importador_id = $1', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ msg: 'Cupo no encontrado' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor'+err.message);
  }
}
);

///////////////////////////////////////////////////

router.post('/', async (req, res) => {
    const {
        importador_id,importador, anio, hfc, hcfc
    } = req.body;
  
    try {
      // Verificar si el Cupo ya existe
      const { rows } = await pool.query('SELECT * FROM public.cupo WHERE importador = $1', [importador]);
      if (rows.length > 0) {
        return res.status(400).json({ msg: 'El Cupo ya existe' });
      }

      console.log('body', req.body);
  
      // Insertar el nuevo Cupo en la base de datos
      const newSust = await pool.query(
        'INSERT INTO public.cupo (importador_id,importador, anio, hfc, hcfc, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) RETURNING *',
        [importador_id,importador, anio, hfc, hcfc]
      );
  
      res.json({ msg: 'Cupo creado con éxito', cupo: newSust.rows[0] });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error del servidor'+err.message);
    }
  });
  

// Actualizar un cupo
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { importador, anio, hfc, hcfc} = req.body;

  try {
      const updateQuery = `
          UPDATE public.cupo
          SET importador = $1, anio = $2, hfc = $3, hcfc = $4, updated_at = NOW()
          WHERE id = $5
          RETURNING *;
      `;
      const { rows } = await pool.query(updateQuery, [importador, anio, hfc, hcfc, id]);
      //const rows = result.rows;

      if (rows.length === 0) {
          return res.status(404).json({ msg: 'Cupo no encontrado' });
      }

      res.json({ msg: 'Cupo actualizada', cupo: rows[0] });
  } catch (err) {
      console.error(err.message);
      res.status(500).json({msg: 'Server Error'+err.message});
  }
});


// Eliminar un cupo

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
      const deleteQuery = 'DELETE FROM public.cupo WHERE id = $1;';
      const result = await pool.query(deleteQuery, [id]);

      if (result.rowCount === 0) {
          return res.status(404).json({ msg: 'Cupo no encontrado' });
      }

      res.json({ msg: 'Cupo eliminado con éxito' });
  } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Error del servidor'+err.message });
  }
});


// Buscar cupos por nombre
router.get('/search', async (req, res) => {
  const { importador } = req.query; // Obtén el nombre del query string

  try {
      const searchQuery = 'SELECT * FROM public.cupo WHERE importador ILIKE $1';
      const { rows } = await pool.query(searchQuery, [`%${importador}%`]); // Usar ILIKE para búsqueda insensible a mayúsculas/minúsculas
      
      if (rows.length === 0) {
          return res.status(404).json({ msg: 'No se encontraron países con ese nombre' });
      }

      res.json(rows);
  } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Error del servidor'+err.message });
  }
});

module.exports = router;
