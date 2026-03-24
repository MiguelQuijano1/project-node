
const express = require('express');
const menuRouter = require('./routes/menu.routes');
const logger = require('./middlewares/logger');
const conectarDB = require('./database/connection');
const authRouter = require('./routes/auth.routes');
const app = express();
const PORT = 3000;

// Conectar a MongoDB antes de todo
conectarDB();

app.use(express.json());
app.use(logger);


app.use('/menu', menuRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
    res.status(200).json({
        mensaje: 'Restaurante Node API',
        version: '2.0.0',
        rutas: ['/menu'] // puedes agregar '/auth' cuando lo tengas
    });
});

app.listen(PORT, () => {
    console.log(`Restaurante corriendo en http://localhost:${PORT}`);
});