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
        // Validar campos requeridos
        const { name, price, description } = req.body;
        
        if (!name || !price) {
            return res.status(400).json({ error: 'Name and price are required' });
        }
        
        // Solo pasar los campos necesarios (sin fechas)
        const productData = {
            name: name.trim(),
            description: description?.trim() || '',
            price: parseFloat(price)
        };
        
        const product = await createProduct(productData);
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const putProduct = async (req, res) => {
    try {
        // Validar campos requeridos
        const { name, price, description } = req.body;
        
        if (!name || !price) {
            return res.status(400).json({ error: 'Name and price are required' });
        }
        
        // Solo pasar los campos necesarios (sin fechas)
        const productData = {
            name: name.trim(),
            description: description?.trim() || '',
            price: parseFloat(price)
        };
        
        const updated = await updateProduct(req.params.id, productData);
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