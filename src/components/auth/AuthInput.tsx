import React from 'react';
import { LucideIcon } from 'lucide-react';

interface AuthInputProps {
  icon: LucideIcon;
  type: string;
  name: string
  placeholder: string;
}

const AuthInput = ({ 
  icon: Icon, 
  type,  
  name,
  placeholder 
}: AuthInputProps) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type={type}
        name={name}
        className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-gray-900/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
        placeholder={placeholder}
        required
      />
    </div>
  );
}

export default AuthInput