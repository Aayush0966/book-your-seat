'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AdvancedPreloader = () => {
  const router = useRouter();
  const [preloadedPages, setPreloadedPages] = useState<Set<string>>(new Set());

  useEffect(() => {
    const pagesToPreload = [
      '/home',
      '/contact', 
      '/ticket-rate',
      '/profile'
    ];

    const preloadPage = async (page: string) => {
      if (preloadedPages.has(page)) return;
      try {
        router.prefetch(page);
        setPreloadedPages(prev => new Set([...prev, page]));
        console.log(`✅ Preloaded: ${page}`);
      } catch (error) {
        console.warn(`❌ Failed to preload ${page}:`, error);
      }
    };

    const immediatePreload = () => {
      preloadPage('/home');
      preloadPage('/contact');
    };

    const delayedPreload = () => {
      setTimeout(() => {
        preloadPage('/ticket-rate');
      }, 200);
      setTimeout(() => {
        preloadPage('/profile');
      }, 400);
    };

    immediatePreload();
    delayedPreload();

    const handleInteraction = () => {
      pagesToPreload.forEach(page => preloadPage(page));
    };

    const events = ['mouseenter', 'focus', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, handleInteraction, { once: true, passive: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleInteraction);
      });
    };
  }, [router, preloadedPages]);

  useEffect(() => {
    const handleLinkHover = (e: Event) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href]') as HTMLAnchorElement;
      if (link && link.href) {
        const url = new URL(link.href);
        if (url.origin === window.location.origin) {
          router.prefetch(url.pathname);
        }
      }
    };

    document.addEventListener('mouseover', handleLinkHover, { passive: true });
    return () => {
      document.removeEventListener('mouseover', handleLinkHover);
    };
  }, [router]);

  return null;
};

export default AdvancedPreloader; 