const CACHE_NAME = 'book-your-seat-v5';
const STATIC_CACHE_NAME = 'book-your-seat-static-v5';

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
    if (response && response.ok && response.status === 200 && !response.bodyUsed && response.type !== 'opaqueredirect') {
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
    const response = await fetch(request, {
      redirect: 'follow',
      mode: 'cors',
      credentials: 'same-origin'
    });
    
    // Cache successful responses that aren't redirected
    if (response && response.ok && !response.redirected && response.type !== 'opaqueredirect') {
      const cache = await caches.open(cacheName);
      const responseClone = response.clone();
      await safeCacheResponse(cache, request, responseClone);
    }
    return response;
  } catch (error) {
    console.debug('Fetch error:', error);
    // Try to return from cache if fetch fails
    try {
      const cache = await caches.open(cacheName);
      return await cache.match(request);
    } catch (cacheError) {
      console.debug('Cache match error:', cacheError);
      return null;
    }
  }
}

// Install event - cache static assets and pages
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    Promise.allSettled([
      // Cache static assets one by one to avoid addAll failures
      caches.open(STATIC_CACHE_NAME).then(async (cache) => {
        for (const asset of STATIC_ASSETS) {
          try {
            const response = await fetch(asset, { 
              redirect: 'follow',
              mode: 'cors',
              credentials: 'same-origin'
            });
            if (response.ok && !response.redirected && response.type !== 'opaqueredirect') {
              await cache.put(asset, response);
            }
          } catch (error) {
            console.debug(`Failed to cache ${asset}:`, error);
          }
        }
      })
      // Don't pre-cache pages during install to avoid conflicts with Vercel routing
    ]).then(() => {
      console.log('Service Worker installed successfully');
      // Force the waiting service worker to become the active service worker
      self.skipWaiting();
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker activated');
      // Take control of all pages
      return self.clients.claim();
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

  // Skip service worker requests
  if (url.pathname.includes('sw.js')) return;

  // Skip API auth routes to avoid interference
  if (url.pathname.startsWith('/api/auth')) return;

  // Handle static assets (highest priority for caching)
  if (url.pathname.startsWith('/_next/static/') || 
      url.pathname.startsWith('/static/') ||
      url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|webp)$/)) {
    event.respondWith(
      (async () => {
        try {
          const cachedResponse = await caches.match(request);
          if (cachedResponse) {
            return cachedResponse;
          }
          return await fetchAndCache(request, STATIC_CACHE_NAME);
        } catch (error) {
          console.debug('Static asset fetch error:', error);
          return fetch(request);
        }
      })()
    );
    return;
  }

  // Handle API requests with network-first strategy
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      (async () => {
        try {
          const response = await fetchAndCache(request, CACHE_NAME);
          if (response && response.ok) {
            return response;
          }
          // If network fails, try cache
          const cachedResponse = await caches.match(request);
          return cachedResponse || fetch(request);
        } catch (error) {
          console.debug('API fetch error:', error);
          return fetch(request);
        }
      })()
    );
    return;
  }

  // Handle page requests (navigation) - Vercel optimized
  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(
      (async () => {
        try {
          // For navigation, try network first to handle Vercel routing correctly
          const networkResponse = await fetch(request);
          
          // Only cache successful, non-redirected responses
          if (networkResponse.ok && !networkResponse.redirected && networkResponse.status === 200) {
            try {
              const cache = await caches.open(CACHE_NAME);
              const responseClone = networkResponse.clone();
              await safeCacheResponse(cache, request, responseClone);
            } catch (cacheError) {
              // Ignore cache errors for navigation
              console.debug('Cache error during navigation:', cacheError);
            }
          }
          
          return networkResponse;
        } catch (error) {
          console.debug('Navigation fetch error:', error);
          // Try cache as fallback only if network completely fails
          try {
            const cachedResponse = await caches.match(request);
            if (cachedResponse) {
              return cachedResponse;
            }
          } catch (cacheError) {
            console.debug('Cache match error:', cacheError);
          }
          
          // Final fallback - let the browser handle it naturally
          throw error;
        }
      })()
    );
    return;
  }

  // For other requests, let them pass through normally
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
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
}); 