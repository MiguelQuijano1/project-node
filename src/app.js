// app.js — Servidor HTTP del Restaurante
const http = require('http');
const { URL } = require('url');


// Los mismos datos del Sprint 0, ahora en el servidor
let menu = [
    { id: 1, nombre: 'Lomo saltado', categoria: 'segundos', precio: 18, stock: 3, disponible: true },
    { id: 2, nombre: 'Arroz con pollo', categoria: 'segundos', precio: 12, stock: 5, disponible: true },
    { id: 3, nombre: 'Sopa', categoria: 'entradas', precio: 8, stock: 10, disponible: true }
];

const PORT = 5000;
const HOST = 'localhost';

const server = http.createServer((req, res) => {
    try {

        if (req.url === '/' && req.method === 'GET') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ mensaje: 'Bienvenido al Restaurante Node' }));
            return;
        }
        if (req.url === '/menu' && req.method === 'POST') {
            let body = '';

            // El body llega en partes — se va juntando
            req.on('data', chunk => {
                body += chunk;
            });

            // Cuando terminaron de llegar todos los datos
            req.on('end', () => {
                try {
                    const nuevoPlato = JSON.parse(body);

                    // Validar que tenga los campos necesarios
                    if (!nuevoPlato.nombre || !nuevoPlato.precio) {
                        res.statusCode = 400;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({
                            error: 'Se requieren nombre y precio'
                        }));
                        return;
                    }

                    // Agregar el plato al menú — igual que agregarPlato() del Sprint 0
                    const plato = {
                        id: menu.length + 1,
                        nombre: nuevoPlato.nombre,
                        categoria: nuevoPlato.categoria || 'sin categoría',
                        precio: nuevoPlato.precio,
                        stock: nuevoPlato.stock || 0,
                        disponible: (nuevoPlato.stock || 0) > 0
                    };
                    menu.push(plato);

                    // 201 Created — se usó para registros en el Sprint 0
                    res.statusCode = 201;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({
                        mensaje: 'Plato agregado correctamente',
                        plato
                    }));

                } catch (parseError) {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ error: 'JSON inválido' }));
                }
            });
            return;
        }

        if (req.url.startsWith('/menu') && req.method === 'GET') {
            // Parsear la URL para leer query params
            const parsedUrl = new URL(req.url, `http://${HOST}:${PORT}`);
            const nombre = parsedUrl.searchParams.get('nombre');

            if (nombre) {
                // Buscar plato por nombre — igual que buscarPlatoPorNombre() del Sprint 0
                const plato = menu.find(
                    p => p.nombre.toLowerCase().includes(nombre.toLowerCase())
                );

                if (!plato) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ error: `Plato '${nombre}' no encontrado` }));
                    return;
                }

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(plato));
                return;
            }

            // Sin query param — devolver todo el menú
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(menu));
            return;
        }



        // 404 — ruta no encontrada
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Ruta no encontrada' }));

    } catch (error) {
        // 500 — error interno del servidor
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Error interno del servidor' }));
        console.error('Error:', error.message);
    }
});



server.listen(PORT, HOST, () => {
    console.log(`Restaurante corriendo en http://${HOST}:${PORT}`);
});
