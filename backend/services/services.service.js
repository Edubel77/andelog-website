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
        const service = new Service(data);
        db.query('INSERT INTO services SET ?', service, (err, result) => {
            if (err) return reject(err);
            service.id = result.insertId;
            resolve(service);
        });
    });
};

export const updateService = (id, data) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE services SET ? WHERE id = ?', [data, id], (err) => {
            if (err) return reject(err);
            resolve({ id, ...data });
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