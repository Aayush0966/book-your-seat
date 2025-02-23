'use client'
import { FC } from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { User, Settings, LogOut } from 'lucide-react';
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
          <DropdownMenuItem>
            <Link className='flex gap-2 cursor-pointer' href='/profile'> <User className="h-6 w-6" /> Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className='cursor-pointer' onClick={() => handleLogout(navigate)}>
            <LogOut />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;