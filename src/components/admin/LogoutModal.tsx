'use client'
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { LogOut } from 'lucide-react';

interface LogoutModalProps {
  onLogout: () => Promise<void>;
}

const LogoutModal = ({ onLogout }: LogoutModalProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="flex w-full items-center text-left">
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to logout from the Movie Admin dashboard?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row gap-3">
          <AlertDialogCancel className="mt-0">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onLogout}
            className="bg-accent hover:bg-dark-accent"
          >
            Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutModal;