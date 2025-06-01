'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

interface PreloadLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  prefetch?: boolean;
  [key: string]: any;
}

const PreloadLink = ({ 
  href, 
  children, 
  className, 
  prefetch = true, 
  ...props 
}: PreloadLinkProps) => {
  const router = useRouter();
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (prefetch) {
      // Immediate prefetch for critical routes
      const criticalRoutes = ['/home', '/contact', '/ticket-rate'];
      if (criticalRoutes.includes(href)) {
        router.prefetch(href);
      }
    }
  }, [href, prefetch, router]);

  const handleMouseEnter = () => {
    if (prefetch) {
      router.prefetch(href);
    }
  };

  const handleFocus = () => {
    if (prefetch) {
      router.prefetch(href);
    }
  };

  return (
    <Link
      ref={linkRef}
      href={href}
      className={className}
      prefetch={prefetch}
      onMouseEnter={handleMouseEnter}
      onFocus={handleFocus}
      {...props}
    >
      {children}
    </Link>
  );
};

export default PreloadLink; 