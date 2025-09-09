import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { config } from './config.js';
import usersRouter from './routes/users.routes.js';

const app = express();

// Middleware base
app.use(express.json());
app.use(morgan('dev'));
app.use(
  cors({
    origin: config.CORS_ORIGIN,
  })
);

// Endpoints API
app.get('/api/health', (req, res) => res.json({ ok: true, env: config.NODE_ENV }));
app.use('/api', usersRouter);

// Servir estáticos desde dist (para producción o pruebas de build)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, '..', 'dist');

app.use(express.static(distDir));

// Fallback SPA: devuelve index.html para rutas no-API
app.use((req, res, next) => {
  // Deja pasar cualquier llamada a /api (ya fue atendida arriba o deberá 404)
  if (req.path.startsWith('/api')) return next();
  // Devuelve index.html para que el SPA maneje la ruta en el front
  res.sendFile(path.join(distDir, 'index.html'), (err) => (err ? next(err) : null));
});

// Manejador de errores
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // Log en servidor
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Internal Server Error' });
});

// Arranque
app.listen(config.PORT, () => {
  console.log(`API escuchando en http://localhost:${config.PORT}`);
  if (config.NODE_ENV !== 'production') {
    console.log(`CORS permitido desde: ${config.CORS_ORIGIN}`);
  }
});
