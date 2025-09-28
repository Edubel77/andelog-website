import express from 'express';
import { getAll, get, create, update, remove } from '../controllers/users.controller.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/users',authenticateJWT, getAll);
router.get('/users/:id',authenticateJWT, get);
router.post('/users', authenticateJWT, create);
router.put('/users/:id',authenticateJWT, update);
router.delete('/users/:id',authenticateJWT, remove);

export default router;
