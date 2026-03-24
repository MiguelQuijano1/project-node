// middlewares/logger.js
const logger = (req, res, next) => {
    const ahora = new Date().toLocaleTimeString();
    console.log(`[${ahora}]  ${req.method}  ${req.url}`);
    next(); // sin next() la petición se detiene aquí
};

module.exports = logger;

