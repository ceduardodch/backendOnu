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
        const masterQuery = 'SELECT * FROM public.importacion';
        const masterResult = await pool.query(masterQuery);
  
        if (masterResult.rows.length === 0) {
            return res.status(404).json({ message: 'Master records not found' });
        }
  
        // Consultar detalles asociados a cada maestro
        for (let i = 0; i < masterResult.rows.length; i++) {
          const detailQuery = `SELECT * FROM public.importacion_detail WHERE importacion = ${masterResult.rows[i].id}`;
          const detailResult = await pool.query(detailQuery);
          masterResult.rows[i].details = detailResult.rows;
        }
  
        res.json(masterResult.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
  });

//Trae solo el total de la solicitud de importacion para calcular el cupo restate
router.get('/:importador', async (req, res) => {
    const { importador } = req.params;
    try {
        const { rows } = await pool.query('SELECT COALESCE(sum(tota_solicitud), 0) as total_solicitud FROM public.importacion WHERE importador = $1', [importador]);      if (rows.length === 0) {
        return res.status(404).json({ msg: 'Importacion no encontrada' });
      }
      res.json(rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error del servidor');
    }
  }
    );


    app.post('/', async (req, res) => {
        const body = req.body;
      
        try {
          // Iniciar transacción
          await db.tx(async t => {
            // Insertar en la tabla maestra
            const masterInsert = 'INSERT INTO public.importacion(authorization_date, month, cupo_asignado, status, cupo_restante, tota_solicitud, total_pesokg, vue, data_file, importador, years, pais, proveedor) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id';
            const masterValues = [body.authorization_date, body.month, body.cupo_asignado, body.status, body.cupo_restante, body.tota_solicitud, body.total_pesokg, body.vue, body.data_file, body.importador, body.years, body.pais, body.proveedor];
            const masterResult = await t.one(masterInsert, masterValues);
      
            // Insertar en la tabla de detalles
            for (const detail of body.details) {
              const detailInsert = 'INSERT INTO public.importacion_detail(cif, fob, peso_kg, pao, sustancia, subpartida, ficha_file, importacion_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8)';
              const detailValues = [detail.cif, detail.fob, detail.peso_kg, detail.pao, detail.sustancia, detail.subpartida, detail.ficha_file, masterResult.id];
              await t.none(detailInsert, detailValues);
            }
          });
      
          res.status(201).send('Importación creada con éxito');
        } catch (err) {
          console.error(err);
          res.status(500).send('Error del servidor');
        }
      });
      
      app.listen(3000, () => {
        console.log('Servidor escuchando en el puerto 3000');
      });



module.exports = router;
