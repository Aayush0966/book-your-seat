'use client'
import { FC, useState } from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { User, Settings, LogOut, Loader2 } from 'lucide-react';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { handleLogout } from '@/lib/utils';
import Link from 'next/link';

interface ProfileDropdownProps {
  session: Session;
}

const ProfileDropdown: FC<ProfileDropdownProps> = ({ session }) => {
  const navigate = useRouter();
  const [isNavigatingToProfile, setIsNavigatingToProfile] = useState(false);

  const handleProfileClick = () => {
    setIsNavigatingToProfile(true);
    // Use router.push for immediate navigation
    navigate.push('/profile');
    setTimeout(() => {
      setIsNavigatingToProfile(false);
    }, 2000);
  };

  return (
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
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <button 
              className='flex gap-2 cursor-pointer w-full items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
              onClick={handleProfileClick}
              disabled={isNavigatingToProfile}
            >
              {isNavigatingToProfile ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <User className="h-4 w-4" />
              )}
              <span>{isNavigatingToProfile ? 'Loading Profile...' : 'Profile'}</span>
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem className='cursor-pointer' onClick={() => handleLogout(navigate)}>
            <LogOut className="h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;