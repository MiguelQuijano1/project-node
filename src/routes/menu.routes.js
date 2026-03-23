// routes/menu.routes.js
const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menu.controller');
const verifyToken = require('../middlewares/verifyToken');

// Rutas libres (GET)
router.get('/', menuController.obtenerMenu);
router.get('/buscar', menuController.buscarPlato);
router.get('/:id', menuController.buscarPlato);

// Rutas protegidas (POST, PUT, DELETE)
router.post('/', verifyToken, menuController.agregarPlato);
router.put('/:id', verifyToken, menuController.actualizarPlato);
router.delete('/:id', verifyToken, menuController.eliminarPlato);

// Middleware verificarDatosPlato (si lo tienes)
const verificarDatosPlato = (req, res, next) => {
    const { nombre, precio } = req.body;
    if (!nombre || !precio) {
        return res.status(400).json({ error: 'Middleware: nombre y precio son obligatorios' });
    }
    if (precio <= 0) {
        return res.status(400).json({ error: 'Middleware: el precio debe ser mayor a cero' });
    }
    next();
};

// Sobrescribe el POST con middleware adicional si lo necesitas
router.post('/', verificarDatosPlato, verifyToken, menuController.agregarPlato);

module.exports = router;