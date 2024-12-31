'use client'
import React from 'react'
import { Film, Ticket, Users, Clock, Settings, LayoutDashboardIcon } from 'lucide-react';
import { logOutAdmin } from '@/app/actions';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import LogoutModal from './LogoutModal';

interface SidebarProps {
    activeItem: string;
    setActiveItem: (item: string) => void;
  }

const Sidebar = ({activeItem, setActiveItem}: SidebarProps) => {
    const router = useRouter();
    

    const handleActive = (label: string) => {
        setActiveItem(label.toLowerCase())
    }

    const handleLogout = async () => {
      const response = await logOutAdmin();
      if (!response) toast.error("Failed to logout.")
      router.push('/admin')
    }

  return (
    <div className="relative sm:w-40 w-20  min-h-screen  bg-white shadow-lg">
    <div className="p-6">
      <h2 className="text-xs sm:text-xl font-bold text-gray-800">Movie Admin</h2>
    </div>
    <nav className="mt-6">
      <div className="space-y-1">
        {[
            {icon: LayoutDashboardIcon, label: 'Dashboard'},
          { icon: Film, label: 'Movies' },
          { icon: Ticket, label: 'Bookings' },
          { icon: Users, label: 'Users' },
          { icon: Clock, label: 'Showtimes' },
          { icon: Settings, label: 'Settings' },
        ].map((item) => (
          <button
            onClick={() => handleActive(item.label)}
            key={item.label}
            className={`flex w-full items-center px-6 py-3 text-sm ${
              activeItem === item.label.toLowerCase()
                ? 'sm:bg-gray-100 bg-white text-blue-600' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <item.icon className="mr-3 h-5 w-5" />
            <span className='sm:block hidden'> {item.label}  </span>
          </button>
        ))}
      </div>
      <div className= 'flex w-full items-center px-6 py-3 text-sm text-gray-600 hover:bg-gray-50'>
    <LogoutModal  onLogout={handleLogout} />
    
      </div>
    </nav>
  </div>
  )
}

export default Sidebar