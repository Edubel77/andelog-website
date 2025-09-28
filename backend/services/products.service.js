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
        const product = new Product(data);
        db.query('INSERT INTO products SET ?', product, (err, result) => {
            if (err) return reject(err);
            product.id = result.insertId;
            resolve(product);
        });
    });
};

export const updateProduct = (id, data) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE products SET ? WHERE id = ?', [data, id], (err) => {
            if (err) return reject(err);
            resolve({ id, ...data });
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