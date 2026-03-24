const platoService = require('../services/plato.service');

exports.obtenerMenu = async (req, res) => {
    try {
        const platos = await platoService.obtenerTodos();
        res.status(200).json(platos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.buscarPorNombre = async (req, res) => {
    try {
        const platos = await platoService.buscarPorNombre(req.query.nombre);
        res.status(200).json(platos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.filtrarPorCategoria = async (req, res) => {
    try {
        const platos = await platoService.buscarPorCategoria(req.params.categoria);
        res.status(200).json(platos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.buscarPlato = async (req, res) => {
    try {
        const plato = await platoService.buscarPorId(req.params.id);
        if (!plato) return res.status(404).json({ error: 'Plato no encontrado' });
        res.status(200).json(plato);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.agregarPlato = async (req, res) => {
    try {
        const plato = await platoService.crear(req.body);
        res.status(201).json(plato);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.eliminarPlato = async (req, res) => {
    try {
        await platoService.eliminar(req.params.id);
        res.status(200).json({ mensaje: 'Plato eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.actualizarPlato = async (req, res) => {
    try {
        const plato = await platoService.actualizar(req.params.id, req.body);
        res.status(200).json(plato);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};