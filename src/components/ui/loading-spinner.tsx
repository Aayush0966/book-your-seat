import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className,
  text 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <div className="relative">
        <div className={cn(
          "border-4 border-gray-200 rounded-full",
          sizeClasses[size]
        )}></div>
        <div className={cn(
          "border-4 border-primary rounded-full animate-spin absolute top-0 left-0 border-t-transparent",
          sizeClasses[size]
        )}></div>
      </div>
      {text && (
        <p className="mt-3 text-sm text-gray-600 font-medium animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner; 