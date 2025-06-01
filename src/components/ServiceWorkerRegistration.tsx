'use client'
import { useEffect } from 'react';

const ServiceWorkerRegistration = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('✅ Service Worker registered successfully:', registration);
          const pagesToCache = ['/home', '/contact', '/ticket-rate', '/profile'];
          registration.active?.postMessage({
            type: 'CACHE_PAGES',
            pages: pagesToCache
          });
        })
        .catch((error) => {
          console.warn('❌ Service Worker registration failed:', error);
        });

      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('🔄 Service Worker updated, reloading page...');
        window.location.reload();
      });
    }
  }, []);

  return null;
};

export default ServiceWorkerRegistration; 