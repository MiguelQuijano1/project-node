const express = require('express');
const menuRouter = require('./routes/menu.routes');
const authRouter = require('./routes/auth.routes');
const { port } = require('./config');
const conectarDB = require('./database/connection');
const logger = require('./middlewares/logger');

const app = express();

conectarDB();

app.use(express.json());
app.use(logger);

app.use('/menu', menuRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
    res.status(200).json({
        mensaje: 'Restaurante Node API',
        version: '2.0.0',
        rutas: ['/menu']
    });
});

// Exportar app para que los tests puedan usarla
module.exports = app;

// app.listen solo se ejecuta si NO estamos en modo test
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Restaurante corriendo en http://localhost:${port}`);
    });
}