import express from 'express';
import cors from 'cors';
import morgan from 'morgan';


import { db } from './config/db.config.js';
import { config } from './config.js';
import usersRouter from './routes/users.routes.js';

const app = express();

// Conexión a la base de datos
db.connect((err) => {
  
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    process.exit(1);
  }
  console.log('Connected to MySQL database');
});

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
