let currentProductId = null;

document.addEventListener('DOMContentLoaded', () => {
    // Verificar autenticación
    if (!isAuthenticated()) {
        window.location.href = 'login.html';
        return;
    }

    // Inicializar Materialize
    M.Modal.init(document.querySelectorAll('.modal'));
    M.updateTextFields();

    // Cargar productos
    loadProducts();

    // Manejar logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    }

    // Manejar guardar producto
    const saveBtn = document.getElementById('saveProduct');
    if (saveBtn) {
        saveBtn.addEventListener('click', saveProduct);
    }

    // Limpiar modal cuando se abre para nuevo producto
    const addBtn = document.querySelector('[data-target="productModal"]');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            currentProductId = null;
            document.getElementById('modalTitle').textContent = 'Nuevo Producto';
            document.getElementById('productForm').reset();
            M.updateTextFields();
        });
    }
});

async function loadProducts() {
    try {
        const products = await productsAPI.getAll();
        displayProducts(products);
    } catch (error) {
        M.toast({ html: 'Error al cargar productos: ' + error.message, classes: 'red' });
    }
}

function displayProducts(products) {
    const container = document.getElementById('productsContainer');
    container.innerHTML = '';

    if (products.length === 0) {
        container.innerHTML = '<p class="center-align">No hay productos registrados</p>';
        return;
    }

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'col s12 m6 l4';
        card.innerHTML = `
            <div class="card">
                <div class="card-content">
                    <span class="card-title">${product.name}</span>
                    <p>${product.description || 'Sin descripción'}</p>
                    <p><strong>Precio: $${product.price}</strong></p>
                </div>
                <div class="card-action">
                    <a href="#!" onclick="editProduct(${product.id})">Editar</a>
                    <a href="#!" onclick="deleteProduct(${product.id})" class="red-text">Eliminar</a>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

async function editProduct(id) {
    currentProductId = id;
    document.getElementById('modalTitle').textContent = 'Editar Producto';
    
    try {
        // Cargar datos del producto existente
        const product = await productsAPI.getById(id);
        document.getElementById('productName').value = product.name;
        document.getElementById('productDescription').value = product.description || '';
        document.getElementById('productPrice').value = product.price;
        
        // Actualizar labels de Materialize
        M.updateTextFields();
    } catch (error) {
        M.toast({ html: 'Error al cargar producto: ' + error.message, classes: 'red' });
    }
    
    const modal = M.Modal.getInstance(document.getElementById('productModal'));
    modal.open();
}

async function deleteProduct(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
        try {
            await productsAPI.delete(id);
            M.toast({ html: 'Producto eliminado exitosamente', classes: 'green' });
            loadProducts();
        } catch (error) {
            M.toast({ html: 'Error al eliminar producto: ' + error.message, classes: 'red' });
        }
    }
}

async function saveProduct() {
    const name = document.getElementById('productName').value;
    const description = document.getElementById('productDescription').value;
    const price = parseFloat(document.getElementById('productPrice').value);

    if (!name || !price) {
        M.toast({ html: 'Nombre y precio son obligatorios', classes: 'red' });
        return;
    }

    const productData = {
        name,
        description,
        price
    };

    try {
        if (currentProductId) {
            await productsAPI.update(currentProductId, productData);
            M.toast({ html: 'Producto actualizado exitosamente', classes: 'green' });
        } else {
            await productsAPI.create(productData);
            M.toast({ html: 'Producto creado exitosamente', classes: 'green' });
        }
        
        // Cerrar modal y limpiar formulario
        const modal = M.Modal.getInstance(document.getElementById('productModal'));
        modal.close();
        document.getElementById('productForm').reset();
        currentProductId = null;
        
        // Recargar productos
        loadProducts();
    } catch (error) {
        M.toast({ html: 'Error al guardar producto: ' + error.message, classes: 'red' });
    }
}