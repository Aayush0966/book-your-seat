import React from 'react';
import {
  Shield,
  CreditCard,
  Bell,
  FileText,
  HelpCircle,
  MessageSquare,
  User,
  LogOut,
  ChevronRight
} from 'lucide-react';

const SettingsTab = () => {
  return (
    <div className="grid md:grid-cols-2 gap-6 animate-fade-in">
      <div className="bg-white dark:bg-dark-background-secondary rounded-xl p-6">
        <h2 className="text-xl font-bold text-dark-text dark:text-text mb-4">
          Account Settings
        </h2>
        <div className="space-y-4">
          <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-background-secondary dark:hover:bg-dark-background transition-colors">
            <span className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-text-secondary dark:text-dark-text-secondary">
                Privacy Settings
              </span>
            </span>
            <ChevronRight className="w-5 h-5" />
          </button>
          <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-background-secondary dark:hover:bg-dark-background transition-colors">
            <span className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-primary" />
              <span className="text-text-secondary dark:text-dark-text-secondary">
                Payment Methods
              </span>
            </span>
            <ChevronRight className="w-5 h-5" />
          </button>
          <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-background-secondary dark:hover:bg-dark-background transition-colors">
            <span className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-primary" />
              <span className="text-text-secondary dark:text-dark-text-secondary">
                Notification Settings
              </span>
            </span>
            <ChevronRight className="w-5 h-5" />
          </button>
          <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-background-secondary dark:hover:bg-dark-background transition-colors">
            <span className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-primary" />
              <span className="text-text-secondary dark:text-dark-text-secondary">
                Terms & Conditions
              </span>
            </span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-dark-background-secondary rounded-xl p-6">
        <h2 className="text-xl font-bold text-dark-text dark:text-text mb-4">
          Help & Support
        </h2>
        <div className="space-y-4">
          <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-background-secondary dark:hover:bg-dark-background transition-colors">
            <span className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-primary" />
              <span className="text-text-secondary dark:text-dark-text-secondary">
                FAQs & Help Center
              </span>
            </span>
            <ChevronRight className="w-5 h-5" />
          </button>
          <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-background-secondary dark:hover:bg-dark-background transition-colors">
            <span className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-primary" />
              <span className="text-text-secondary dark:text-dark-text-secondary">
                Contact Support
              </span>
            </span>
            <ChevronRight className="w-5 h-5" />
          </button>
          <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-background-secondary dark:hover:bg-dark-background transition-colors">
            <span className="flex items-center gap-3">
              <User className="w-5 h-5 text-primary" />
              <span className="text-text-secondary dark:text-dark-text-secondary">
                About Us
              </span>
            </span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Logout Button */}
        <div className="mt-8">
          <button className="w-full flex items-center justify-center gap-2 p-3 rounded-lg bg-error/10 text-error hover:bg-error/20 transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab; 