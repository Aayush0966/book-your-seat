const CACHE_NAME = 'book-your-seat-v1';
const STATIC_CACHE_NAME = 'book-your-seat-static-v1';

// Pages to cache immediately
const PAGES_TO_CACHE = [
  '/',
  '/home',
  '/contact',
  '/ticket-rate',
  '/profile',
  '/auth'
];

// Static assets to cache
const STATIC_ASSETS = [
  '/favicon.ico',
  '/icon.png',
  '/manifest.json'
];

// Install event - cache static assets and pages
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(STATIC_CACHE_NAME).then((cache) => {
        return cache.addAll(STATIC_ASSETS);
      }),
      // Cache pages
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(PAGES_TO_CACHE);
      })
    ]).then(() => {
      // Force the waiting service worker to become the active service worker
      self.skipWaiting();
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Take control of all pages
      self.clients.claim();
    })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip external requests
  if (url.origin !== self.location.origin) return;

  // Handle page requests
  if (request.mode === 'navigate') {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          // Serve from cache immediately
          fetch(request).then((networkResponse) => {
            // Update cache in background
            if (networkResponse.ok) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, networkResponse.clone());
              });
            }
          }).catch(() => {
            // Network failed, but we have cache
          });
          return cachedResponse;
        }

        // Not in cache, fetch from network
        return fetch(request).then((networkResponse) => {
          if (networkResponse.ok) {
            // Cache the response
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, networkResponse.clone());
            });
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // Handle static assets
  if (url.pathname.startsWith('/_next/static/') || 
      url.pathname.startsWith('/static/') ||
      url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2)$/)) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        return cachedResponse || fetch(request).then((networkResponse) => {
          if (networkResponse.ok) {
            caches.open(STATIC_CACHE_NAME).then((cache) => {
              cache.put(request, networkResponse.clone());
            });
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // Handle API requests with network-first strategy
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request).then((networkResponse) => {
        if (networkResponse.ok) {
          // Cache successful API responses for short time
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, networkResponse.clone());
          });
        }
        return networkResponse;
      }).catch(() => {
        // Network failed, try cache
        return caches.match(request);
      })
    );
    return;
  }
});

// Message event - handle cache updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CACHE_PAGES') {
    const pagesToCache = event.data.pages || [];
    
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all(
        pagesToCache.map((page) => {
          return fetch(page).then((response) => {
            if (response.ok) {
              return cache.put(page, response);
            }
          }).catch(() => {
            // Ignore failed requests
          });
        })
      );
    });
  }
}); 