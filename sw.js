const CACHE_VERSION = "v1";
const STATIC_CACHE = `static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = "dynamic";
const OFFLINE_PAGE = "/offline.html";

const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/src/js/index.js",
  "/src/css/index.css",
  "/admission.html",
  OFFLINE_PAGE,
];

// Install Event
self.addEventListener("install", (e) => {
  console.log("[Service Worker] Installing...");
  e.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log("[Service Worker] Caching static assets...");
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Fetch Event
self.addEventListener("fetch", (e) => {
  console.log(`[Service Worker] Fetching: ${e.request.url}`);
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      // Return cached response if available
      if (cachedResponse) {
        console.log(`[Service Worker] Serving from cache: ${e.request.url}`);
        return cachedResponse;
      }

      // Fetch from network if not in cache
      return fetch(e.request)
        .then((networkResponse) => {
          // Cache the network response
          return caches.open(DYNAMIC_CACHE).then((cache) => {
            console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
            cache.put(e.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {
          // Show offline page if network fails
          if (e.request.mode === "navigate") {
            console.log("[Service Worker] Serving offline page...");
            return caches.match(OFFLINE_PAGE);
          }
        });
    })
  );
});

// Activate Event
self.addEventListener("activate", (e) => {
  console.log("[Service Worker] Activating...");
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Delete old caches
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log(`[Service Worker] Deleting old cache: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
