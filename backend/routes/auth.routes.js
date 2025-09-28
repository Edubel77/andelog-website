import express from 'express';
import { loginUser, registerUser } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/auth/login', loginUser);
router.post('/auth/register', registerUser);

export default router;