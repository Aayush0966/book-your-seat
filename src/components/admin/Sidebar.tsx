'use client'
import { logOutAdmin } from '@/app/(admin)/admin/actions';
import { 
  Film, 
  LayoutDashboard, 
  Settings, 
  Ticket, 
  Users, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useShow } from '@/context/showContext';

interface SidebarProps {
  activeItem: string;
  setActiveItem: (item: string) => void;
}

const Sidebar = ({ activeItem, setActiveItem }: SidebarProps) => {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { bookings, users, movies, isLoading } = useShow()

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', badge: null },
    { 
      icon: Film, 
      label: 'Movies', 
      badge: !isLoading && movies && movies.length > 0 ? movies.length : null 
    },
    { 
      icon: Ticket, 
      label: 'Bookings', 
      badge: !isLoading && bookings && bookings.length > 0 ? bookings.length : null 
    },
    { 
      icon: Users, 
      label: 'Users', 
      badge: !isLoading && users && users.length > 0 ? users.length : null 
    },
    { icon: Settings, label: 'Settings', badge: null },
  ];

  const handleActive = (label: string) => {
    setActiveItem(label.toLowerCase());
    if (window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }
  };

  const handleLogout = async () => {
    const response = await logOutAdmin();
    if (!response) toast.error("Failed to logout.");
    router.push('/admin');
  };

  return (
    <div 
      className={`fixed left-0 top-0 h-full transition-all duration-300 ease-in-out z-50
        ${isCollapsed ? 'w-20' : 'w-64'}
        bg-white dark:bg-gray-800 shadow-xl border-r border-gray-200 dark:border-gray-700
        flex flex-col`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 bg-white dark:bg-gray-800 rounded-full p-1.5 shadow-lg 
          hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 border border-gray-200 dark:border-gray-600"
      >
        {isCollapsed ? 
          <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-300" /> : 
          <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        }
      </button>

      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-md">
            <Film className="w-5 h-5 text-white" />
          </div>
          <h2 className={`font-bold text-gray-800 dark:text-white transition-all duration-200
            ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
            Movie Admin
          </h2>
        </div>
      </div>

      {/* Navigation - Scrollable */}
      <nav className="flex-1 overflow-y-auto py-6 px-3">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <button
              onClick={() => handleActive(item.label)}
              key={item.label}
              className={`flex items-center w-full px-3 py-3 rounded-lg transition-all duration-200 group
                ${activeItem === item.label.toLowerCase()
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
            >
              <item.icon className={`${isCollapsed ? 'w-6 h-6' : 'w-5 h-5'} transition-all duration-200 flex-shrink-0`} />
              <span className={`ml-3 font-medium transition-all duration-200
                ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
                {item.label}
              </span>
              {item.badge && !isCollapsed && (
                <span className="ml-auto bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 
                  text-xs px-2 py-1 rounded-full font-semibold min-w-[20px] text-center">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-200 dark:border-gray-700" />

        {/* Help Section */}
        <button className={`flex items-center w-full px-3 py-3 rounded-lg transition-all duration-200 group
          text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-200`}>
          <HelpCircle className={`${isCollapsed ? 'w-6 h-6' : 'w-5 h-5'} flex-shrink-0`} />
          <span className={`ml-3 font-medium transition-all duration-200
            ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
            Help & Support
          </span>
        </button>
      </nav>

      {/* Logout Button - Fixed at bottom */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
        <button
          onClick={handleLogout}
          className={`flex items-center w-full px-3 py-3 rounded-lg transition-all duration-200 group
            text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 
            hover:text-red-600 dark:hover:text-red-400`}
        >
          <LogOut className={`${isCollapsed ? 'w-6 h-6' : 'w-5 h-5'} 
            transition-all duration-200 group-hover:rotate-12 flex-shrink-0`} />
          <span className={`ml-3 font-medium transition-all duration-200
            ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
            Sign Out
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;