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
        });
    });
});