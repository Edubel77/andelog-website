import { Product } from '../model/product.model.js';
import { db } from '../config/db.config.js';

export const getAllProducts = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM products', (err, results) => {
            if (err) return reject(err);
            resolve(results.map(row => new Product(row)));
        });
    });
};

export const getProductById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
            if (err) return reject(err);
            resolve(results.length ? new Product(results[0]) : null);
        });
    });
};

export const createProduct = (data) => {
    return new Promise((resolve, reject) => {
        // Preparar datos con fechas en formato MySQL
        const now = new Date();
        const productData = {
            name: data.name,
            description: data.description,
            price: data.price,
            created_at: now,
            updated_at: now
        };
        
        db.query('INSERT INTO products SET ?', productData, (err, result) => {
            if (err) return reject(err);
            const product = new Product({ id: result.insertId, ...productData });
            resolve(product);
        });
    });
};

export const updateProduct = (id, data) => {
    return new Promise((resolve, reject) => {
        // Preparar datos con fecha de actualización
        const updateData = {
            name: data.name,
            description: data.description,
            price: data.price,
            updated_at: new Date()
        };
        
        db.query('UPDATE products SET ? WHERE id = ?', [updateData, id], (err) => {
            if (err) return reject(err);
            resolve({ id, ...updateData });
        });
    });
};

export const deleteProduct = (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM products WHERE id = ?', [id], (err) => {
            if (err) return reject(err);
            resolve({ id });
        });
    });
};