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

router.get('/products', authenticateJWT, getProducts);
router.get('/products/:id', authenticateJWT, getProduct);
router.post('/products', authenticateJWT, postProduct);
router.put('/products/:id', authenticateJWT, putProduct);
router.delete('/products/:id', authenticateJWT, removeProduct);

export default router;