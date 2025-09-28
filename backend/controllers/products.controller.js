import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from '../services/products.service.js';

export const getProducts = async (req, res) => {
    try {
        const products = await getAllProducts();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getProduct = async (req, res) => {
    try {
        const product = await getProductById(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const postProduct = async (req, res) => {
    try {
        const product = await createProduct(req.body);
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const putProduct = async (req, res) => {
    try {
        const updated = await updateProduct(req.params.id, req.body);
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const removeProduct = async (req, res) => {
    try {
        const deleted = await deleteProduct(req.params.id);
        res.json(deleted);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};