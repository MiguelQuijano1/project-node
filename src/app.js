<<<<<<< HEAD
function saludar(nombre) {
    return `Hola ${nombre}, bienvenido a Node`;
}

console.log(saludar("Sebastian"));

const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {

    try {

        const parsedUrl = url.parse(req.url, true);

        if (parsedUrl.pathname === "/" && req.method === "GET") {

            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");

            res.end(JSON.stringify({
                mensaje: "Bienvenido al servidor"
            }));

        }

        else if (parsedUrl.pathname === "/about" && req.method === "GET") {

            res.statusCode = 200;
            res.end(JSON.stringify({
                mensaje: "Página about"
            }));

        }

        else if (parsedUrl.pathname === "/profile" && req.method === "GET") {

            const name = parsedUrl.query.name;

            if (!name) {

                res.statusCode = 400;

                res.end(JSON.stringify({
                    error: "Debe enviar el parámetro name"
                }));

            } else {

                res.statusCode = 200;

                res.end(JSON.stringify({
                    mensaje: `Accediendo a profile: ${name}`
                }));

            }

        }

        else if (parsedUrl.pathname === "/register" && req.method === "POST") {

            let body = "";

            req.on("data", chunk => {
                body += chunk;
            });

            req.on("end", () => {

                const data = JSON.parse(body);

                const username = data.username;
                const email = data.email;

                res.statusCode = 201;

                res.end(JSON.stringify({
                    mensaje: "Usuario registrado",
                    username,
                    email
                }));

            });

        }

        else {

            res.statusCode = 404;

            res.end(JSON.stringify({
                error: "Ruta no encontrada"
            }));

        }

    } catch (error) {

        res.statusCode = 500;

        res.end(JSON.stringify({
            error: "Ha ocurrido un error en el servidor"
        }));

    }

});

server.listen(5000, () => {
    console.log("Servidor ejecutándose en http://localhost:5000");
=======

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
>>>>>>> 9f5d744 (Dia 5 Autenticacion y middleware)
});