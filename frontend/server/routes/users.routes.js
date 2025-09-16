import { Router } from 'express';
import { getUsers, getUser, postUser } from '../controllers/users.controller.js';

const router = Router();

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.post('/users', postUser);

export default router;
