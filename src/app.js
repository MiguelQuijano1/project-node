const express = require('express');
const menuRouter = require('./routes/menu.routes');

const app = express();
const PORT = 3000;
const logger = require('./middlewares/logger');

app.use(express.json());
app.use(logger);

app.use('/menu', menuRouter);

// Ruta de bienvenida
app.get('/', (req, res) => {
    res.status(200).json({
        mensaje: 'Restaurante Node API',
        version: '2.0.0',
        rutas: ['/menu']
    });
});

app.listen(PORT, () => {
    console.log(`Restaurante corriendo en http://localhost:${PORT}`);
});