import { Service } from '../model/service.model.js';
import { db } from '../config/db.config.js';

export const getAllServices = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM services', (err, results) => {
            if (err) return reject(err);
            resolve(results.map(row => new Service(row)));
        });
    });
};

export const getServiceById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM services WHERE id = ?', [id], (err, results) => {
            if (err) return reject(err);
            resolve(results.length ? new Service(results[0]) : null);
        });
    });
};

export const createService = (data) => {
    return new Promise((resolve, reject) => {
        // Preparar datos con fechas en formato MySQL
        const now = new Date();
        const serviceData = {
            name: data.name,
            description: data.description,
            created_at: now,
            updated_at: now
        };
        
        db.query('INSERT INTO services SET ?', serviceData, (err, result) => {
            if (err) return reject(err);
            const service = new Service({ id: result.insertId, ...serviceData });
            resolve(service);
        });
    });
};

export const updateService = (id, data) => {
    return new Promise((resolve, reject) => {
        // Preparar datos con fecha de actualización
        const updateData = {
            name: data.name,
            description: data.description,
            updated_at: new Date()
        };
        
        db.query('UPDATE services SET ? WHERE id = ?', [updateData, id], (err) => {
            if (err) return reject(err);
            resolve({ id, ...updateData });
        });
    });
};

export const deleteService = (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM services WHERE id = ?', [id], (err) => {
            if (err) return reject(err);
            resolve({ id });
        });
    });
};