// Asignamos un nombre a la caché
const CACHE_NAME = 'Ariel Hernán Contini';

// Cuando se instala el service worker, no hacemos mucho por ahora, 
// solo dejamos que se registre.
self.addEventListener('install', (event) => {
    console.log('Service Worker instalado');
});

// Este evento es OBLIGATORIO para que Chrome muestre el botón de instalar.
// Simplemente intercepta las peticiones de red.
self.addEventListener('fetch', (event) => {
    event.respondWith(fetch(event.request));
});