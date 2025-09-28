import {
    getAllServices,
    getServiceById,
    createService,
    updateService,
    deleteService
} from '../services/services.service.js';

export const getServices = async (req, res) => {
    try {
        const services = await getAllServices();
        res.json(services);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getService = async (req, res) => {
    try {
        const service = await getServiceById(req.params.id);
        if (!service) return res.status(404).json({ error: 'Service not found' });
        res.json(service);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const postService = async (req, res) => {
    try {
        const service = await createService(req.body);
        res.status(201).json(service);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const putService = async (req, res) => {
    try {
        const updated = await updateService(req.params.id, req.body);
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const removeService = async (req, res) => {
    try {
        const deleted = await deleteService(req.params.id);
        res.json(deleted);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};