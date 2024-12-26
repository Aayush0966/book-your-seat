'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import logo from '@/assets/logo.png';
import { usePathname } from 'next/navigation'


const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const loggedIn = false;
  const pathname = usePathname()

  const navItems = [
    { name: 'Home', path: '/home' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className="w-full fixed top-0 z-50 border-b bg-background shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center">
            <Image 
              src={logo} 
              width={160} 
              height={120} 
              alt="Studio Logo"
              className="hover:scale-105 transition-transform duration-200"
            />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(item => (
              <Link 
                key={item.name} 
                href={item.path}
                className={`relative text-dark-text hover:text-primary transition-colors duration-200 py-2 group ${pathname === item.path? 'text-primary': ''}`}
              >
                {item.name}
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full ${pathname === item.path? 'w-full': ''}`} />
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            {!loggedIn ? (
              <Button 
                className="bg-primary hover:bg-dark-primary transition-colors duration-200"
                aria-label="Log in"
              >
                Log in
              </Button>
            ) : (
              <div className="relative group">
                <Image 
                  className="rounded-full hover:ring-2 ring-primary transition-all duration-200 cursor-pointer"
                  src="https://img.icons8.com/ios-filled/50/user-male-circle.png"
                  width={40}
                  height={40}
                  alt="User profile"
                />
              </div>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-text-secondary hover:text-primary hover:bg-background-secondary/10 transition-colors duration-200"
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden transition-all duration-200 ease-in-out ${
          isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-4 pt-2 pb-3 space-y-1 bg-background-secondary/5">
          {navItems.map(item => (
            <Link
              key={item.name}
              href={item.path}
              className="block px-3 py-2 text-text-secondary hover:text-primary hover:bg-background-secondary/10 rounded-md transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          {!loggedIn && (
            <Button
              className="w-full mt-2 bg-primary hover:bg-dark-primary transition-colors duration-200"
            >
              Log in
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;