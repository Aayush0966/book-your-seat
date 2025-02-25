import React from 'react';
import { Button } from "@/components/ui/button";

interface HeaderSectionProps {
  title: string;
  subtitle?: string;
  action?: {
    label: string;
    icon?: React.ReactNode;
    onClick?: () => void;
  };
}

const HeaderSection = ({ title, subtitle, action }: HeaderSectionProps) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-gray-100 dark:to-gray-400">
          {title}
        </h1>
        {subtitle && (
          <p className="text-muted-foreground mt-1">
            {subtitle}
          </p>
        )}
      </div>
      {action && (
        <Button 
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
          onClick={action.onClick}
        >
          {action.icon}
          {action.label}
        </Button>
      )}
    </div>
  );
};

export default HeaderSection; 