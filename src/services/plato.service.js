const Plato = require('../models/plato.model');

exports.obtenerTodos = async () => await Plato.find();

exports.buscarPorId = async (id) => await Plato.findById(id);

exports.crear = async (data) => await new Plato(data).save();

exports.eliminar = async (id) => await Plato.findByIdAndDelete(id);

exports.actualizar = async (id, data) =>
    await Plato.findByIdAndUpdate(id, data, { new: true });