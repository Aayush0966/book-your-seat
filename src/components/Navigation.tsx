'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import logo from "@/assets/logo.png";
import { Menu, X } from 'lucide-react';
import ProfileDropdown from './ProfileDropdown';
import { getSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { useRouter, usePathname } from 'next/navigation';
import { handleLogout } from '@/lib/utils';

interface NavItem {
  name: string;
  path: string;
}

const Navigation = () => {
  const [mobileDropdown, setMobileDropdown] = React.useState<boolean>(false);
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();
  const navItems: NavItem[] = [
    {name:'Home', path:'/home'},
    {name: 'Contact', path: '/contact'},
    {name: 'Ticket rate', path: '/ticket-rate'}
  ];
  const [session, setSession] = React.useState<Session | null>(null);
  const navigate = useRouter();

  React.useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession();
      setSession(sessionData);
    };
    fetchSession();

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`w-full shadow-lg fixed top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-background/80 backdrop-blur-lg shadow-lg' 
        : 'bg-background'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex justify-between h-20 items-center">
          <Link 
            href="/" 
            className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md group"
          >
            <div className="relative overflow-hidden">
              <Image 
                src={logo}
                width={160} 
                height={120} 
                alt="Company Logo"
                className="transform transition-all duration-300 group-hover:scale-110"
                priority
              />
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-10">
            {navItems.map(item => (
              <Link 
                key={item.path}
                href={item.path}
                className={`relative text-dark-text group px-2 py-2 ${
                  pathname === item.path ? 'text-primary' : ''
                }`}
              >
                <span className={`relative z-10 transition-colors duration-300 group-hover:text-primary ${
                  pathname === item.path ? 'text-primary' : ''
                }`}>
                  {item.name}
                </span>
                <span 
                  className={`absolute bottom-0 left-0 h-0.5 bg-primary rounded-full transition-all duration-300 ${
                    pathname === item.path ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                  }`}
                  aria-hidden="true"
                />
                <span 
                  className={`absolute inset-0 w-full h-full bg-primary/5 rounded-lg transition-transform duration-300 ${
                    pathname === item.path ? 'scale-100' : 'scale-0 group-hover:scale-100'
                  }`}
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {session ? (
              <ProfileDropdown session={session} />
            ) : (
              <Link 
                href="/auth"
                className="relative inline-flex items-center justify-center rounded-lg text-sm font-medium h-10 px-6 
                  bg-primary text-white overflow-hidden group hover:scale-105 transition-all duration-300"
              >
                <span className="relative z-10">Log in</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            )}
          </div>

          <Button
            variant="ghost"
            className="md:hidden p-2 hover:bg-primary/10 transition-colors duration-300"
            aria-expanded={mobileDropdown}
            aria-controls="mobile-menu"
            aria-label={mobileDropdown ? "Close menu" : "Open menu"}
            onClick={() => setMobileDropdown(!mobileDropdown)}
          >
            {mobileDropdown ? (
              <X className="h-6 w-6 transform rotate-0 transition-transform duration-300" />
            ) : (
              <Menu className="h-6 w-6 transform rotate-0 transition-transform duration-300" />
            )}
          </Button>
        </div>

        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            mobileDropdown ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 py-3 space-y-3 bg-background/95 backdrop-blur-sm rounded-lg mb-4">
            {navItems.map(item => (
              <Link
                key={item.path}
                href={item.path}
                className={`block px-4 py-2 rounded-lg transition-all duration-300 relative overflow-hidden group ${
                  pathname === item.path 
                    ? 'text-primary bg-primary/5' 
                    : 'text-dark-text hover:text-primary hover:bg-primary/5'
                }`}
                onClick={() => setMobileDropdown(false)}
              >
                <span className="relative z-10">{item.name}</span>
                <div className={`absolute inset-0 bg-primary/5 transform transition-transform duration-300 ${
                  pathname === item.path 
                    ? 'translate-x-0' 
                    : '-translate-x-full group-hover:translate-x-0'
                }`} />
              </Link>
            ))}
            {!session ? (
              <Button 
                className="w-full mt-2 bg-primary hover:bg-primary/90 transition-all duration-300 
                  hover:scale-105 transform"
              >
                Log in
              </Button>
            ) : (
              <Button 
                onClick={() => {
                  handleLogout(navigate);
                  setMobileDropdown(false);
                }} 
                className="w-full mt-2 bg-primary hover:bg-primary/90 transition-all duration-300 
                  hover:scale-105 transform"
              >
                Log Out
              </Button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;