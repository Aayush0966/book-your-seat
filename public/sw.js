const CACHE_NAME = 'book-your-seat-v4';
const STATIC_CACHE_NAME = 'book-your-seat-static-v4';

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

// Helper function to create fetch request with proper options
function createFetchRequest(request) {
  return new Request(request, {
    method: request.method,
    headers: request.headers,
    body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
    mode: 'same-origin',
    credentials: 'same-origin',
    cache: 'default',
    redirect: 'follow'
  });
}

// Helper function to safely fetch and cache
async function fetchAndCache(request, cacheName) {
  try {
    // Create a new request with follow redirects
    const fetchRequest = createFetchRequest(request);
    
    const response = await fetch(fetchRequest);
    
    // Don't cache redirected responses or error responses
    if (response && response.ok && !response.redirected && response.type !== 'opaqueredirect') {
      const cache = await caches.open(cacheName);
      // Clone the response before caching
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
              mode: 'same-origin',
              credentials: 'same-origin'
            });
            if (response.ok && !response.redirected && response.type !== 'opaqueredirect') {
              await cache.put(asset, response);
            }
          } catch (error) {
            console.debug(`Failed to cache ${asset}:`, error);
          }
        }
      }),
      // Cache pages one by one
      caches.open(CACHE_NAME).then(async (cache) => {
        for (const page of PAGES_TO_CACHE) {
          try {
            const response = await fetch(page, { 
              redirect: 'follow',
              mode: 'same-origin',
              credentials: 'same-origin'
            });
            if (response.ok && !response.redirected && response.type !== 'opaqueredirect') {
              await cache.put(page, response);
            }
          } catch (error) {
            console.debug(`Failed to cache ${page}:`, error);
          }
        }
      })
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

  // Handle page requests (navigation)
  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          // Check cache first
          const cachedResponse = await caches.match(request);
          if (cachedResponse) {
            // Serve from cache and update in background
            fetchAndCache(request, CACHE_NAME).catch(() => {
              // Ignore background update errors
            });
            return cachedResponse;
          }

          // Not in cache, fetch from network with proper redirect handling
          const fetchRequest = createFetchRequest(request);
          const response = await fetch(fetchRequest);
          
          // If it's a redirect, just return it without caching
          if (response.redirected || response.type === 'opaqueredirect') {
            return response;
          }
          
          // Cache successful responses
          if (response.ok) {
            const cache = await caches.open(CACHE_NAME);
            const responseClone = response.clone();
            await safeCacheResponse(cache, request, responseClone);
          }
          
          return response;
        } catch (error) {
          console.debug('Navigation fetch error:', error);
          // Try cache one more time
          const cachedResponse = await caches.match(request);
          if (cachedResponse) {
            return cachedResponse;
          }
          // Return a basic fallback response
          return new Response('Service temporarily unavailable', { 
            status: 503,
            headers: { 'Content-Type': 'text/plain' }
          });
        }
      })()
    );
    return;
  }

  // Handle static assets
  if (url.pathname.startsWith('/_next/static/') || 
      url.pathname.startsWith('/static/') ||
      url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2)$/)) {
    event.respondWith(
      (async () => {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetchAndCache(request, STATIC_CACHE_NAME);
      })()
    );
    return;
  }

  // Handle API requests with network-first strategy
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      (async () => {
        const response = await fetchAndCache(request, CACHE_NAME);
        if (response) {
          return response;
        }
        // If network fails, try cache
        return await caches.match(request);
      })()
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
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
}); 