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

// Servir estáticos desde src (para desarrollo)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.join(__dirname, '..', 'src');

app.use(express.static(srcDir));

// Rutas específicas para las páginas
app.get('/login', (req, res) => {
  res.sendFile(path.join(srcDir, 'login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(srcDir, 'register.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(srcDir, 'dashboard.html'));
});

app.get('/products', (req, res) => {
  res.sendFile(path.join(srcDir, 'products.html'));
});

app.get('/services', (req, res) => {
  res.sendFile(path.join(srcDir, 'services.html'));
});

// Fallback SPA: devuelve index.html para rutas no-API
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(srcDir, 'index.html'), (err) => (err ? next(err) : null));
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
