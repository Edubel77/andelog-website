import express from 'express';
import {
    getService,
    postService,
    putService,
    removeService,
    getServices
} from '../controllers/services.controller.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', authenticateJWT, getServices);
router.get('/:id', authenticateJWT, getService);
router.post('/', authenticateJWT, postService);
router.put('/:id', authenticateJWT, putService);
router.delete('/:id', authenticateJWT, removeService);

export default router;