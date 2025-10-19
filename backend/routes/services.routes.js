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

router.get('/services', authenticateJWT, getServices);
router.get('/services/:id', authenticateJWT, getService);
router.post('/services', authenticateJWT, postService);
router.put('/services/:id', authenticateJWT, putService);
router.delete('/services/:id', authenticateJWT, removeService);

export default router;