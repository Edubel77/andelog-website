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
        // Validar campos requeridos
        const { name, description } = req.body;
        
        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }
        
        // Solo pasar los campos necesarios (sin fechas)
        const serviceData = {
            name: name.trim(),
            description: description?.trim() || ''
        };
        
        const service = await createService(serviceData);
        res.status(201).json(service);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const putService = async (req, res) => {
    try {
        // Validar campos requeridos
        const { name, description } = req.body;
        
        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }
        
        // Solo pasar los campos necesarios (sin fechas)
        const serviceData = {
            name: name.trim(),
            description: description?.trim() || ''
        };
        
        const updated = await updateService(req.params.id, serviceData);
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