'use client'
import { useEffect } from 'react';

const ServiceWorkerRegistration = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('✅ Service Worker registered successfully:', registration);
          
          // Wait for service worker to be active before sending messages
          const sendCacheMessage = () => {
            if (registration.active) {
              const pagesToCache = ['/home', '/contact', '/ticket-rate', '/profile'];
              registration.active.postMessage({
                type: 'CACHE_PAGES',
                pages: pagesToCache
              });
            }
          };

          if (registration.active) {
            sendCacheMessage();
          } else {
            // Wait for service worker to become active
            registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing;
              if (newWorker) {
                newWorker.addEventListener('statechange', () => {
                  if (newWorker.state === 'activated') {
                    sendCacheMessage();
                  }
                });
              }
            });
          }
        })
        .catch((error) => {
          console.warn('❌ Service Worker registration failed:', error);
        });

      // Handle service worker updates
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('🔄 Service Worker updated, reloading page...');
        window.location.reload();
      });
    }
  }, []);

  return null;
};

export default ServiceWorkerRegistration; 