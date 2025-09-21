import express from 'express';
import { getAll, get, create, update, remove } from '../controllers/users.controller.js';

const router = express.Router();

router.get('/users', getAll);
router.get('/users/:id', get);
router.post('/users', create);
router.put('/users/:id', update);
router.delete('/users/:id', remove);

export default router;
