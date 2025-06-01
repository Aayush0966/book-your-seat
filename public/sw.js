const CACHE_NAME = 'book-your-seat-v3';
const STATIC_CACHE_NAME = 'book-your-seat-static-v3';

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

// Helper function to safely cache a response
async function safeCacheResponse(cache, request, response) {
  try {
    // Only cache if response is valid and not already consumed
    if (response && response.ok && response.status === 200 && !response.bodyUsed) {
      // Create a new response to avoid cloning issues
      const responseToCache = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers
      });
      await cache.put(request, responseToCache);
    }
  } catch (error) {
    // Silently ignore cache errors
    console.debug('Cache error:', error);
  }
}

// Helper function to safely fetch and cache
async function fetchAndCache(request, cacheName) {
  try {
    const response = await fetch(request);
    if (response && response.ok) {
      const cache = await caches.open(cacheName);
      // Clone the response before caching
      const responseClone = response.clone();
      await safeCacheResponse(cache, request, responseClone);
    }
    return response;
  } catch (error) {
    console.debug('Fetch error:', error);
    // Try to return from cache if fetch fails
    const cache = await caches.open(cacheName);
    return await cache.match(request);
  }
}

// Install event - cache static assets and pages
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.allSettled([
      // Cache static assets one by one to avoid addAll failures
      caches.open(STATIC_CACHE_NAME).then(async (cache) => {
        for (const asset of STATIC_ASSETS) {
          try {
            await cache.add(asset);
          } catch (error) {
            console.debug(`Failed to cache ${asset}:`, error);
          }
        }
      }),
      // Cache pages one by one
      caches.open(CACHE_NAME).then(async (cache) => {
        for (const page of PAGES_TO_CACHE) {
          try {
            await cache.add(page);
          } catch (error) {
            console.debug(`Failed to cache ${page}:`, error);
          }
        }
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

  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) return;

  // Handle page requests (navigation)
  if (request.mode === 'navigate') {
    event.respondWith(
      caches.match(request).then(async (cachedResponse) => {
        if (cachedResponse) {
          // Serve from cache and update in background
          fetchAndCache(request, CACHE_NAME).catch(() => {
            // Ignore background update errors
          });
          return cachedResponse;
        }

        // Not in cache, fetch from network
        return fetchAndCache(request, CACHE_NAME);
      })
    );
    return;
  }

  // Handle static assets
  if (url.pathname.startsWith('/_next/static/') || 
      url.pathname.startsWith('/static/') ||
      url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2)$/)) {
    event.respondWith(
      caches.match(request).then(async (cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetchAndCache(request, STATIC_CACHE_NAME);
      })
    );
    return;
  }

  // Handle API requests with network-first strategy
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetchAndCache(request, CACHE_NAME).then((response) => {
        if (response) {
          return response;
        }
        // If network fails, try cache
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
    
    Promise.allSettled(
      pagesToCache.map(async (page) => {
        try {
          await fetchAndCache(page, CACHE_NAME);
        } catch (error) {
          console.debug(`Failed to cache page ${page}:`, error);
        }
      })
    );
  }
}); 