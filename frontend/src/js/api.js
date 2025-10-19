const API_BASE_URL = 'http://localhost:3000/api';

// Funciones de utilidad para la API
const getToken = () => localStorage.getItem('token');

const apiRequest = async (url, options = {}) => {
    const token = getToken();
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers
        },
        ...options
    };

    try {
        const response = await fetch(`${API_BASE_URL}${url}`, config);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Error en la petición');
        }
        
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

// Funciones de autenticación
const authAPI = {
    login: async (email, password) => {
        return apiRequest('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
    },
    
    register: async (name, email, password) => {
        return apiRequest('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password })
        });
    }
};

// Funciones para productos
const productsAPI = {
    getAll: () => apiRequest('/products'),
    
    getById: (id) => apiRequest(`/products/${id}`),
    
    create: (product) => apiRequest('/products', {
        method: 'POST',
        body: JSON.stringify(product)
    }),
    
    update: (id, product) => apiRequest(`/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(product)
    }),
    
    delete: (id) => apiRequest(`/products/${id}`, {
        method: 'DELETE'
    })
};

// Funciones para servicios
const servicesAPI = {
    getAll: () => apiRequest('/services'),
    
    getById: (id) => apiRequest(`/services/${id}`),
    
    create: (service) => apiRequest('/services', {
        method: 'POST',
        body: JSON.stringify(service)
    }),
    
    update: (id, service) => apiRequest(`/services/${id}`, {
        method: 'PUT',
        body: JSON.stringify(service)
    }),
    
    delete: (id) => apiRequest(`/services/${id}`, {
        method: 'DELETE'
    })
};

// Función para verificar autenticación
const isAuthenticated = () => {
    const token = getToken();
    if (!token) return false;
    
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp > Date.now() / 1000;
    } catch {
        return false;
    }
};

// Función para cerrar sesión
const logout = () => {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
};