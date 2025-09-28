import { db } from '../config/db.config.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_jwt_secret'; // Usa una variable de entorno en producción

export const login = (email, password) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
            if (err) return reject(err);
            if (!results.length) return reject(new Error('User not found'));
            const user = results[0];
            const valid = await bcrypt.compare(password, user.password);
            if (!valid) return reject(new Error('Invalid password'));
            const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
            resolve({ token });
        });
    });
};

export const register = (data) => {
    return new Promise(async (resolve, reject) => {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = { ...data, password: hashedPassword };
        db.query('INSERT INTO users SET ?', user, (err, result) => {
            if (err) return reject(err);
            resolve({ id: result.insertId, ...data, password: undefined });
        });
    });
};