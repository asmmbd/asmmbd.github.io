const CACHE_NAME = 'al-hera-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/src/index.js',
  '/images/logo.jpg',
  '/manifest.json',
  '/favicon.ico'
];

// ইন্সটল ইভেন্ট
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// ফেচ ইভেন্ট
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
    .then((response) => {
      return response || fetch(event.request);
    })
  );
});

// অ্যাক্টিভেট ইভেন্ট
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});