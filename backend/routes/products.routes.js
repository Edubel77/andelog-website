import express from 'express';
import {
    getProducts,
    getProduct,
    postProduct,
    putProduct,
    removeProduct
} from '../controllers/products.controller.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', authenticateJWT, getProducts);
router.get('/:id', authenticateJWT, getProduct);
router.post('/', authenticateJWT, postProduct);
router.put('/:id', authenticateJWT, putProduct);
router.delete('/:id', authenticateJWT, removeProduct);

export default router;