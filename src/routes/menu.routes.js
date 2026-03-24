const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menu.controller');

router.get('/', menuController.obtenerMenu);
router.get('/:id', menuController.buscarPlato);
router.post('/', menuController.agregarPlato);
router.delete('/:id', menuController.eliminarPlato);
router.put('/:id', menuController.actualizarPlato);

module.exports = router;