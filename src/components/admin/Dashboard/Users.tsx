import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  MoreHorizontal, 
  PlusCircle,
} from 'lucide-react';
import { Role } from '@prisma/client';
import { useShow } from '@/context/showContext';
import { formatCurrency, formatDate } from '@/lib/utils';
import StatsCards from './StatsCards';
import HeaderSection from './HeaderSection';
import AdminLoader from '../AdminLoader';

const Users = () => {
  const { users, bookings, isLoading } = useShow();

  // Show loading state while data is being fetched
  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <AdminLoader variant="stats" />
        <AdminLoader variant="table" />
      </div>
    );
  }

  const getTotalBookings = (userId: number) => {
    return bookings?.filter((booking) => booking.userId === userId)
  }

  const getTotalSpent = (userId: number) => {
    const userBookings = getTotalBookings(userId)
    return userBookings?.reduce((acc, value) => acc + value.totalPrice, 0)
  }

  return (
    <div className="p-4 space-y-6">
      <HeaderSection 
        title="Users Dashboard"
        subtitle="Manage and view all user accounts"
      />

      <StatsCards />

      {/* Users Table */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead className="hidden md:table-cell">Contact</TableHead>
                <TableHead className="hidden lg:table-cell">Total Bookings</TableHead>
                <TableHead className="hidden lg:table-cell">Total Spent</TableHead>
                <TableHead className="hidden xl:table-cell">Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users && users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-gray-100 text-gray-800">
                          {user.fullName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.fullName}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {user.contactNumber ? (
                      <span className="text-sm">
                        {'+977 '  + user.contactNumber.toString()}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-500">Not provided</span>
                    )}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <span className="text-sm font-medium">
                      {getTotalBookings(user.id)?.length}
                    </span>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <span className="text-sm text-gray-900">
                      {formatCurrency(getTotalSpent(user.id) || 0)}
                    </span>
                  </TableCell>
                  <TableCell className="hidden xl:table-cell">
                    <span className="text-sm text-gray-500">
                      {
                        formatDate(user.createdAt ? user.createdAt.getTime() / 1000 : 0)
                     }
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit User</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-red-600"
                          disabled={user.role === 'ADMIN'}
                        >
                          Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

    </div>
  );
};

export default Users;