const express = require('express');
const router  = express.Router();
const {
  crearRol,
  obtenerRoles,
  actualizarRol,
  eliminarRol
} = require('../controllers/rolController');

// CRUD de Roles
router.post('/',    crearRol);       // /api/roles
router.get('/',     obtenerRoles);   // /api/roles
router.put('/:id',  actualizarRol);  // /api/roles/:id
router.delete('/:id', eliminarRol);  // /api/roles/:id

module.exports = router;
