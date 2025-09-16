const API = '/api';

// Inicialización Materialize + pequeñas ayudas
document.addEventListener('DOMContentLoaded', () => {
  // SideNav (menú móvil) y otros componentes
  const elems = document.querySelectorAll('.sidenav');
  M.Sidenav.init(elems);

  // Snack de demo al tocar "Escribir ahora"
  const btn = document.getElementById('btnContactar');
  if (btn) {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      M.toast({ html: 'Abriremos el formulario de contacto en la siguiente iteración 👋', classes: 'blue' });
    });
  }

  // Año dinámico en footer
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
});

