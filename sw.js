// Asignamos un nombre a la caché
const CACHE_NAME = 'Ariel Hernán Contini | PORTFOLIO';

// Cuando se instala el service worker, no hacemos mucho por ahora, 
// solo dejamos que se registre.
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});