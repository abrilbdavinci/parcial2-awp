const cacheName = 'tvshows-v1';
const filesToCache = [
  '/',
  '/index.html',
  '/favoritos.html',
  '/js/main.js',
  '/js/script.js',
  '/js/favoritos.js',
  '/css/style.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
  'favicon/android-icon-144x144.png',
  'favicon/favicon-32x32.png',
  'favicon/favicon-96x96.png',
  'favicon/favicon-16x16.png'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('archivos cacheados');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', event => {
  console.log('sw activadisimo!!');
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== cacheName) {
            console.log('borrar cache', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request)
        .then(networkResponse => {
          return caches.open(cacheName).then(cache => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {
          return new Response('<p>sin conexión y esto no está en caché.</p>', {
            headers: { 'Content-Type': 'text/html' }
          });
        });
    })
  );
});


