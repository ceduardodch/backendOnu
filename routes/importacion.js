const express = require('express');
const router = express.Router();
const pool = require('../db');
const cors = require('cors');

// Habilita CORS para todas las rutas
router.use(cors());
// Obtener todos los importacion
router.get('/', async (req, res) => {
    try {
        // Consultar maestro
        const masterQuery = 'SELECT * FROM public.imports';
        const masterResult = await pool.query(masterQuery);
  
        if (masterResult.rows.length === 0) {
            return res.status(404).json({ message: 'Master records not found' });
        }
  
        // Consultar detalles asociados a cada maestro
        for (let i = 0; i < masterResult.rows.length; i++) {
          const detailQuery = `SELECT * FROM public.imports_detail WHERE imports = ${masterResult.rows[i].id}`;
          const detailResult = await pool.query(detailQuery);
          masterResult.rows[i].details = detailResult.rows;
        }
  
        res.json(masterResult.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
  });


router.post('/', async (req, res) => {
  const { masterData, detailData } = req.body; // Asume que la petición contiene los datos del maestro y del detalle

  try {
      await pool.query('BEGIN'); // Iniciar transacción

      // Insertar en maestro
      const masterInsertQuery = `
          INSERT INTO public.imports (...)
          VALUES (...)
          RETURNING id`;
      const masterResult = await pool.query(masterInsertQuery, [...Object.values(masterData)]);
      const masterId = masterResult.rows[0].id;

      // Insertar en detalle
      const detailInsertQuery = `
          INSERT INTO public.imports_detail (imports, ...)
          VALUES ($1, ...)
          RETURNING id`;
      for (const detail of detailData) {
          await pool.query(detailInsertQuery, [masterId, ...Object.values(detail)]);
      }

      await pool.query('COMMIT'); // Finalizar transacción
      res.json({ message: 'Master and detail records created successfully' });
  } catch (err) {
      await pool.query('ROLLBACK'); // Revertir transacción si hay error
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});



module.exports = router;
