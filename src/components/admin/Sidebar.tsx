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

interface SidebarProps {
  activeItem: string;
  setActiveItem: (item: string) => void;
}

const Sidebar = ({ activeItem, setActiveItem }: SidebarProps) => {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', badge: null },
    { icon: Film, label: 'Movies', badge: '3 New' },
    { icon: Ticket, label: 'Bookings', badge: '12' },
    { icon: Users, label: 'Users', badge: null },
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
      className={`relative h-screen transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-20' : 'w-64'}
        bg-white dark:bg-gray-800 shadow-lg z-50`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 bg-white dark:bg-gray-800 rounded-full p-1.5 shadow-md 
          hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
      >
        {isCollapsed ? 
          <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-300" /> : 
          <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        }
      </button>

      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Film className="w-5 h-5 text-white" />
          </div>
          <h2 className={`font-bold text-gray-800 dark:text-white transition-opacity duration-200
            ${isCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>
            Movie Admin
          </h2>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-6 px-3">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <button
              onClick={() => handleActive(item.label)}
              key={item.label}
              className={`flex items-center w-full px-3 py-3 rounded-lg transition-all duration-200
                ${activeItem === item.label.toLowerCase()
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }`}
            >
              <item.icon className={`${isCollapsed ? 'w-6 h-6' : 'w-5 h-5'} transition-all duration-200`} />
              <span className={`ml-3 transition-opacity duration-200
                ${isCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>
                {item.label}
              </span>
              {item.badge && !isCollapsed && (
                <span className="ml-auto bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 
                  text-xs px-2 py-1 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-200 dark:border-gray-700" />

        {/* Help Section */}
        <button className={`flex items-center w-full px-3 py-3 rounded-lg transition-all duration-200
          text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50`}>
          <HelpCircle className={`${isCollapsed ? 'w-6 h-6' : 'w-5 h-5'}`} />
          <span className={`ml-3 transition-opacity duration-200
            ${isCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>
            Help & Support
          </span>
        </button>

        {/* Logout Button */}
        <div className="absolute bottom-8 left-0 right-0 px-3">
          <button
            onClick={handleLogout}
            className={`flex items-center w-full px-3 py-3 rounded-lg transition-all duration-200
              text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 
              hover:text-red-600 dark:hover:text-red-400 group`}
          >
            <LogOut className={`${isCollapsed ? 'w-6 h-6' : 'w-5 h-5'} 
              transition-all duration-200 group-hover:rotate-12`} />
            <span className={`ml-3 font-medium transition-opacity duration-200
              ${isCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>
              Sign Out
            </span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;