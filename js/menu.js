document.addEventListener('DOMContentLoaded', () => {
    // 1. Seleccionamos el botón, el menú y TODOS los enlaces dentro del menú
    const toggleBtn = document.querySelector('.header__toggle');
    const navMenu = document.querySelector('.header__nav');
    const navLinks = document.querySelectorAll('.header__nav a'); // Selecciona los <a>

    // 2. Evento para abrir/cerrar el menú al tocar la hamburguesa
    toggleBtn.addEventListener('click', () => {
        navMenu.classList.toggle('is-active');
    });

    // 3. Evento para cerrar el menú al tocar cualquier enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Usamos 'remove' en lugar de 'toggle' para asegurarnos de que siempre se cierre
            navMenu.classList.remove('is-active');
              botonMenu.classList.toggle('active');
        });
    });
});


// Seleccionamos el botón
const botonMenu = document.getElementById('btn-menu');
// Agregamos el evento de clic
botonMenu.addEventListener('click', () => {
  // classList.toggle hace la magia: 
  // Si la clase 'activa' no está, la agrega. Si ya está, la quita.
  botonMenu.classList.toggle('active');
  
  // AQUÍ TAMBIÉN PUEDES ABRIR TU MENÚ
  // document.getElementById('tu-menu-navegacion').classList.toggle('mostrar-menu');
});