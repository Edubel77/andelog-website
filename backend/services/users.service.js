

import { User } from '../model/user.model.js';
import { db } from '../config/db.config.js';

export const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users', (err, results) => {
            if (err) return reject(err);
            resolve(results.map(row => new User(row)));
        });
    });
};

export const getUserById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
            if (err) return reject(err);
            resolve(results.length ? new User(results[0]) : null);
        });
    });
};

export const createUser = (data) => {
    return new Promise((resolve, reject) => {
        const user = new User(data);
        db.query('INSERT INTO users SET ?', user, (err, result) => {
            if (err) return reject(err);
            user.id = result.insertId;
            resolve(user);
        });
    });
};

export const updateUser = (id, data) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE users SET ? WHERE id = ?', [data, id], (err) => {
            if (err) return reject(err);
            resolve({ id, ...data });
        });
    });
};

export const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM users WHERE id = ?', [id], (err) => {
            if (err) return reject(err);
            resolve({ id });
        });
    });
};






