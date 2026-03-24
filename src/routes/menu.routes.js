const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menu.controller');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', menuController.obtenerMenu);
router.get('/buscar', (req, res, next) => {
    if (!req.query.nombre) {
        return res.status(400).json({ error: 'El parámetro ?nombre= es requerido' });
    }
    next();
}, menuController.buscarPorNombre);
router.get('/:id', menuController.buscarPlato);
router.post('/', verifyToken, menuController.agregarPlato);
router.delete('/:id', verifyToken, menuController.eliminarPlato);
router.put('/:id', verifyToken, menuController.actualizarPlato);

module.exports = router;