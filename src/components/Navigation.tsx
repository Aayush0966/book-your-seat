'use client'

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import { Button } from '@/components/ui/button';
import logo from "@/assets/logo.png"
import { Menu, User, X, Settings, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutUser } from '@/app/auth/actions';
import toast from 'react-hot-toast';

interface NavItem {
  name: string;
  path: string;
  icon?: React.ElementType;
}

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const navItems: NavItem[] = [
    { name: 'Home', path: '/home' },
    { name: 'Contact', path: '/contact' }
  ];

  const handleLogout = useCallback(async () => {
    try {
      await logoutUser();
      toast.success("Logged out successfully")
      router.push('/auth')
    } catch (error) {
      toast.error(error)
    }
  }, []);

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const NavLink = ({ item }: { item: NavItem }) => (
    <Link 
      href={item.path}
      className={`
        relative text-dark-text 
        hover:text-primary 
        transition-colors duration-200 
        py-2 group
        ${pathname === item.path ? 'text-primary' : ''}
      `}
      aria-current={pathname === item.path ? 'page' : undefined}
    >
      <span className="flex items-center gap-2">
        {item.icon && <item.icon className="w-4 h-4" />}
        {item.name}
      </span>
      <span 
        className={`
          absolute bottom-0 left-0 
          h-0.5 bg-primary 
          transition-all duration-200 
          group-hover:w-full
          ${pathname === item.path ? 'w-full' : 'w-0'}
        `} 
        aria-hidden="true"
      />
    </Link>
  );

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
              <NavLink key={item.path} item={item} />
            ))}
          </div>

          <div className="hidden md:flex items-center">
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="flex items-center space-x-2 hover:bg-primary/10 rounded-full p-2"
                    aria-label="User menu"
                  >
                    <User className="h-6 w-6 text-dark-text" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    {session.user?.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                     Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        <div
          id="mobile-menu"
          className={`
            md:hidden 
            transition-all duration-200 ease-in-out
            ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}
          `}
          aria-hidden={!isOpen}
        >
          <div className="px-4 pt-2 pb-3 space-y-1 bg-background-secondary/5">
            {navItems.map(item => (
              <Link
                key={item.path}
                href={item.path}
                className="block px-3 py-2 rounded-md transition-colors duration-200
                  text-text-secondary hover:text-primary 
                  hover:bg-background-secondary/10"
                onClick={toggleMenu}
                aria-current={pathname === item.path ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}
            {!session && (
              <Button
                className="w-full mt-2 bg-primary hover:bg-primary/90 transition-colors duration-200"
              >
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