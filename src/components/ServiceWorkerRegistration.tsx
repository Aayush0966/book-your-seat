'use client'
import { useEffect } from 'react';

const ServiceWorkerRegistration = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator && typeof window !== 'undefined') {
      // Only register service worker in production or when explicitly enabled
      const shouldRegisterSW = process.env.NODE_ENV === 'production' || 
                               process.env.NEXT_PUBLIC_ENABLE_SW === 'true';
      
      if (!shouldRegisterSW) {
        console.log('Service Worker registration skipped in development');
        return;
      }

      navigator.serviceWorker
        .register('/sw.js', { 
          scope: '/',
          updateViaCache: 'none'
        })
        .then((registration) => {
          console.log('✅ Service Worker registered successfully:', registration);
          
          // Check for updates periodically
          setInterval(() => {
            registration.update();
          }, 60000); // Check every minute
          
          // Handle service worker updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New update available
                  console.log('New service worker version available');
                  // Optionally notify user about update
                }
                if (newWorker.state === 'activated') {
                  console.log('Service worker activated');
                  // Send cache message after activation
                  const pagesToCache = ['/home', '/contact', '/ticket-rate', '/profile'];
                  newWorker.postMessage({
                    type: 'CACHE_PAGES',
                    pages: pagesToCache
                  });
                }
              });
            }
          });
          
          // Send initial cache message if service worker is already active
          if (registration.active) {
            const pagesToCache = ['/home', '/contact', '/ticket-rate', '/profile'];
            registration.active.postMessage({
              type: 'CACHE_PAGES',
              pages: pagesToCache
            });
          }
        })
        .catch((error) => {
          console.warn('❌ Service Worker registration failed:', error);
        });

      // Handle service worker controller changes
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('🔄 Service Worker updated');
        // Don't auto-reload in production to avoid disrupting user experience
        if (process.env.NODE_ENV === 'development') {
          window.location.reload();
        }
      });

      // Handle messages from service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'SW_UPDATE_AVAILABLE') {
          console.log('Service worker update available');
          // Handle update notification
        }
      });
    }
  }, []);

  return null;
};

export default ServiceWorkerRegistration; 