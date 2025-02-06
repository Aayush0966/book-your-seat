import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { auth } from "../auth"; // Assuming you have auth function set up
import { Button } from '@/components/ui/button';
import logo from "@/assets/logo.png";
import { User, X, Menu } from 'lucide-react';
import ProfileDropdown from './ProfileDropdown';

interface NavItem {
  name: string;
  path: string;
}

const Navigation = async () => {
  const session = await auth(); 
  const navItems: NavItem[] = [
    { name: 'Home', path: '/home' },
    { name: 'Contact', path: '/contact' },
    { name: 'Ticket rate', path: '/ticket-rate'}
  ];

  return (
    <header className="w-full fixed top-0 z-50 border-b bg-background shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex justify-between h-16 items-center">
          <Link 
            href="/" 
            className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
          >
            <Image 
              src={logo}
              width={160} 
              height={120} 
              alt="Company Logo"
              className="hover:scale-105 transition-transform duration-200"
              priority
            />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(item => (
              <Link 
                key={item.path}
                href={item.path}
                className={`relative text-dark-text hover:text-primary transition-colors duration-200 py-2 group`}
              >
                {item.name}
                <span 
                  className="absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            {session ? (
              <ProfileDropdown session={session} />
            ) : (
              <Link 
                href="/auth"
                className="inline-flex text-white items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90"
                aria-label="Log in"
              >
                Log in
              </Link>
            )}
          </div>

          <Button
            variant="ghost"
            className="md:hidden p-2"
            aria-expanded="false"
            aria-controls="mobile-menu"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        <div id="mobile-menu" className="md:hidden">
          <div className="px-4 pt-2 pb-3 space-y-1 bg-background-secondary/5">
            {navItems.map(item => (
              <Link
                key={item.path}
                href={item.path}
                className="block px-3 py-2 rounded-md transition-colors duration-200 text-text-secondary hover:text-primary hover:bg-background-secondary/10"
              >
                {item.name}
              </Link>
            ))}
            {!session && (
              <Button className="w-full mt-2 bg-primary hover:bg-primary/90 transition-colors duration-200">
                Log in
              </Button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
