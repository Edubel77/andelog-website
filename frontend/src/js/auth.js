document.addEventListener('DOMContentLoaded', () => {
    // Verificar si ya está autenticado
    if (isAuthenticated()) {
        window.location.href = 'dashboard.html';
        return;
    }

    // Manejar formulario de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            try {
                const response = await authAPI.login(email, password);
                localStorage.setItem('token', response.token);
                M.toast({ html: 'Inicio de sesión exitoso', classes: 'green' });
                window.location.href = 'dashboard.html';
            } catch (error) {
                M.toast({ html: error.message, classes: 'red' });
            }
        });
    }

    // Manejar formulario de registro
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            try {
                await authAPI.register(name, email, password);
                M.toast({ html: 'Registro exitoso. Ahora puedes iniciar sesión', classes: 'green' });
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            } catch (error) {
                M.toast({ html: error.message, classes: 'red' });
            }
        });
    }
});