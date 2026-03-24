// test/setup.js — configuración compartida de tests
const { after } = require('node:test');
const mongoose = require('mongoose');

// Cierra la conexión de MongoDB al terminar todos los tests
// Sin esto el proceso queda colgado esperando la conexión abierta
after(async () => {
    await mongoose.connection.close();
});
