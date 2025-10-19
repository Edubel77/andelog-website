let currentServiceId = null;

document.addEventListener('DOMContentLoaded', () => {
    // Verificar autenticación
    if (!isAuthenticated()) {
        window.location.href = 'login.html';
        return;
    }

    // Inicializar Materialize
    M.Modal.init(document.querySelectorAll('.modal'));
    M.updateTextFields();

    // Cargar servicios
    loadServices();

    // Manejar logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    }

    // Manejar guardar servicio
    const saveBtn = document.getElementById('saveService');
    if (saveBtn) {
        saveBtn.addEventListener('click', saveService);
    }

    // Limpiar modal cuando se abre para nuevo servicio
    const addBtn = document.querySelector('[data-target="serviceModal"]');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            currentServiceId = null;
            document.getElementById('modalTitle').textContent = 'Nuevo Servicio';
            document.getElementById('serviceForm').reset();
            M.updateTextFields();
        });
    }
});

async function loadServices() {
    try {
        const services = await servicesAPI.getAll();
        displayServices(services);
    } catch (error) {
        M.toast({ html: 'Error al cargar servicios: ' + error.message, classes: 'red' });
    }
}

function displayServices(services) {
    const container = document.getElementById('servicesContainer');
    container.innerHTML = '';

    if (services.length === 0) {
        container.innerHTML = '<p class="center-align">No hay servicios registrados</p>';
        return;
    }

    services.forEach(service => {
        const card = document.createElement('div');
        card.className = 'col s12 m6 l4';
        card.innerHTML = `
            <div class="card">
                <div class="card-content">
                    <span class="card-title">${service.name}</span>
                    <p>${service.description || 'Sin descripción'}</p>
                </div>
                <div class="card-action">
                    <a href="#!" onclick="editService(${service.id})">Editar</a>
                    <a href="#!" onclick="deleteService(${service.id})" class="red-text">Eliminar</a>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

async function editService(id) {
    currentServiceId = id;
    document.getElementById('modalTitle').textContent = 'Editar Servicio';
    
    try {
        // Cargar datos del servicio existente
        const service = await servicesAPI.getById(id);
        document.getElementById('serviceName').value = service.name;
        document.getElementById('serviceDescription').value = service.description || '';
        
        // Actualizar labels de Materialize
        M.updateTextFields();
    } catch (error) {
        M.toast({ html: 'Error al cargar servicio: ' + error.message, classes: 'red' });
    }
    
    const modal = M.Modal.getInstance(document.getElementById('serviceModal'));
    modal.open();
}

async function deleteService(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este servicio?')) {
        try {
            await servicesAPI.delete(id);
            M.toast({ html: 'Servicio eliminado exitosamente', classes: 'green' });
            loadServices();
        } catch (error) {
            M.toast({ html: 'Error al eliminar servicio: ' + error.message, classes: 'red' });
        }
    }
}

async function saveService() {
    const name = document.getElementById('serviceName').value;
    const description = document.getElementById('serviceDescription').value;

    if (!name) {
        M.toast({ html: 'El nombre es obligatorio', classes: 'red' });
        return;
    }

    const serviceData = {
        name,
        description
    };

    try {
        if (currentServiceId) {
            await servicesAPI.update(currentServiceId, serviceData);
            M.toast({ html: 'Servicio actualizado exitosamente', classes: 'green' });
        } else {
            await servicesAPI.create(serviceData);
            M.toast({ html: 'Servicio creado exitosamente', classes: 'green' });
        }
        
        // Cerrar modal y limpiar formulario
        const modal = M.Modal.getInstance(document.getElementById('serviceModal'));
        modal.close();
        document.getElementById('serviceForm').reset();
        currentServiceId = null;
        
        // Recargar servicios
        loadServices();
    } catch (error) {
        M.toast({ html: 'Error al guardar servicio: ' + error.message, classes: 'red' });
    }
}