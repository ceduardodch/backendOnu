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



router.post('/', async (req, res) => {
    const {
      name, email, phone, company, password, address
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
        'INSERT INTO public.user (name, email, phone, company, password, address, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW()) RETURNING *',
        [name, email, phone, company, password, address]
      );
  
      res.json({ msg: 'Usuario creado con éxito', user: newUser.rows[0] });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error del servidor');
    }
  });

// Actualizar un Users
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, company, password, address} = req.body;

  try {
      const updateQuery = `
          UPDATE public.user
          SET name = $1, email =$2, phone = $3, company = $4, password = $5, address= $6, updated_at = NOW()
          WHERE id = $7
          RETURNING *;
      `;
      const { rows } = await pool.query(updateQuery, [name, email, phone, company,password, address, id]);
      //const rows = result.rows;

      if (rows.length === 0) {
          return res.status(404).json({ msg: 'Usuario no encontrado' });
      }

      res.json({ msg: 'Usuario actualizado', users: rows[0] });
  } catch (err) {
      console.error(err.message);
      res.status(500).json({msg: 'Server Error'});
  }
});


// Eliminar un users

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
      const deleteQuery = 'DELETE FROM public.user WHERE id = $1;';
      const result = await pool.query(deleteQuery, [id]);

      if (result.rowCount === 0) {
          return res.status(404).json({ msg: 'Usuario no encontrado' });
      }

      res.json({ msg: 'Usuario eliminado con éxito' });
  } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Error del servidor' });
  }
});
// Comparar usuario y clave para el login 
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      const loginQuery = 'SELECT * FROM public.user WHERE name = $1 AND password = $2';
      const { rows } = await pool.query(loginQuery, [email, password]);

      if (rows.length === 0) {
          return res.status(400).json({ msg: 'Credenciales inválidas' });
      }

      res.json({ msg: 'Inicio de sesión exitoso', user: rows[0] });
  } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Error del servidor' });
  }
});

// Buscar Userses por nombre
router.get('/search', async (req, res) => {
  const { name } = req.query; // Obtén el nombre del query string

  try {
      const searchQuery = 'SELECT * FROM public.user WHERE name ILIKE $1';
      const { rows } = await pool.query(searchQuery, [`%${name}%`]); // Usar ILIKE para búsqueda insensible a mayúsculas/minúsculas
      
      if (rows.length === 0) {
          return res.status(404).json({ msg: 'No se encontraron usuarios con ese nombre' });
      }

      res.json(rows);
  } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Error del servidor' });
  }
});

module.exports = router;

