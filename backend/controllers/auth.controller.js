import { login, register } from '../services/auth.service.js';

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await login(email, password);
        res.json(result);
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
};

export const registerUser = async (req, res) => {
    try {
        const result = await register(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};