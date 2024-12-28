'use client'
import React from 'react'
import { Film, Ticket, Users, Clock, Settings, LogOut, LayoutDashboardIcon } from 'lucide-react';

interface SidebarProps {
    activeItem: string;
    setActiveItem: (item: string) => void;
  }

const Sidebar = ({activeItem, setActiveItem}: SidebarProps) => {


    const handleActive = (label: string) => {
        setActiveItem(label.toLowerCase())
    }

  return (
    <div className="relative  min-h-screen w-64 bg-white shadow-lg">
    <div className="p-6">
      <h2 className="text-xl font-bold text-gray-800">Movie Admin</h2>
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
          {icon: LogOut, label: 'Log out'}
        ].map((item) => (
          <button
            onClick={(e: React.MouseEvent) => handleActive(item.label)}
            key={item.label}
            className={`flex w-full items-center px-6 py-3 text-sm ${
              activeItem === item.label.toLowerCase()
                ? 'bg-gray-100 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  </div>
  )
}

export default Sidebar