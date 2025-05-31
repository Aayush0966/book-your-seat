import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDate } from '@/lib/utils';
import { BookingStatus } from '@prisma/client';
import StatsCards from './StatsCards';
import { useShow } from '@/context/showContext';
import HeaderSection from './HeaderSection';
import { useState, useEffect } from 'react';
import Pagination from '@/components/ui/Pagination';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Percent, Calendar, RefreshCw, TicketCheck } from "lucide-react";
import toast from "react-hot-toast";
import { Coupon } from "@/types/movie";
import axios from "axios";


const Bookings = () => {
  const { bookings } = useShow();
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("bookings");
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discount: 10,
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], 
    isActive: true
  });

  
  const itemsPerPage = 10; 
  
  const totalPages = Math.ceil((bookings?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBookings = bookings?.slice(startIndex, endIndex);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  const getStatusBadge = (status: BookingStatus) => {
    const styles = {
      'CONFIRMED': 'bg-green-100 text-green-800',
      'PENDING': 'bg-yellow-100 text-yellow-800',
      'CANCELLED': 'bg-red-100 text-red-800'
    };
    return <Badge className={styles[status as keyof typeof styles]}>{status}</Badge>;
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/coupons");
      if (response.data) {
        setCoupons(response.data.coupons);
      } else {
        toast.error('Failed to fetch coupons');
      }
        } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          toast.error('Bad request (400)');
        } 
      } else {
        console.error("Error fetching coupons:", error);
      }
        } finally {
      setIsLoading(false);
        }
      };

  const generateCouponCode  = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setNewCoupon({...newCoupon, code: result});
  };

  const createCoupon = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/coupons', {coupon: newCoupon})

      if (response.data.success) {
        toast.success('Coupon created successfully');
        
        setNewCoupon({
          code: "",
          discount: 10,
          expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          isActive: true
        });
        fetchCoupons();
      } else {
        toast.error('failed creating coupon');
      }
    } catch (error) {
      console.error("Error creating coupon:", error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCouponStatus = async (couponId: string, isActive: boolean) => {
    setIsLoading(true);
    try {
      const response = await axios.patch("/api/coupons", {isActive: !isActive, couponId})
      
      
      if (response.data.success) {
        toast.success(`Coupon ${isActive ? 'deactivated' : 'activated'} successfully`);
        fetchCoupons();
      } else {
        toast.error('failed to update the coupon');
      }
    } catch (error) {
      console.error("Error updating coupon:", error);
      toast.error('error while updating coupon.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <HeaderSection
        title="Bookings & Promotions"
        subtitle="Manage bookings, discounts, and promotional campaigns"
      />
      
      {/* Stats Cards */}
      <StatsCards />
      
      {/* Tabs for Bookings and Coupons */}
      <Tabs defaultValue="bookings" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="bookings" className="flex items-center gap-2">
            <TicketCheck className="w-4 h-4" />
            Bookings
          </TabsTrigger>
          <TabsTrigger value="coupons" className="flex items-center gap-2">
            <Percent className="w-4 h-4" />
            Discount Coupons
          </TabsTrigger>
        </TabsList>
        
        {/* Bookings Tab Content */}
        <TabsContent value="bookings" className="space-y-4">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Booking ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentBookings && currentBookings.map((booking) => (
                    <TableRow key={booking.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{booking.id}</TableCell>
                      <TableCell>{booking.user?.fullName}</TableCell>
                      <TableCell>{formatDate(booking.showDate)}</TableCell>
                      <TableCell>NPR {booking.totalPrice}</TableCell>
                      <TableCell>{getStatusBadge(booking.bookingStatus)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {/* Add Pagination */}
              {bookings && bookings.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Coupons Tab Content */}
        <TabsContent value="coupons" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold mb-1">Discount Coupons</h2>
              <p className="text-sm text-muted-foreground">Create and manage discount coupons for your shows</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
          <Button className="gap-1">
            <PlusCircle className="w-4 h-4" />
            New Coupon
          </Button>
              </DialogTrigger>
              <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Discount Coupon</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="couponCode" className="w-24">Code</Label>
              <Input 
                id="couponCode" 
                value={newCoupon.code}
                onChange={(e) => setNewCoupon({...newCoupon, code: e.target.value})}
                placeholder="e.g., SUMMER25"
                className="flex-1"
              />
              <Button 
                variant="outline" 
                size="sm"
                onClick={generateCouponCode}
                title="Generate random code"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <Label htmlFor="discount" className="w-24">Discount (%)</Label>
              <Input 
                id="discount" 
                type="number" 
                min="1" 
                max="100"
                value={newCoupon.discount}
                onChange={(e) => setNewCoupon({...newCoupon, discount: parseInt(e.target.value)})}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Label htmlFor="expiryDate" className="w-24">Expiry Date</Label>
              <Input 
                id="expiryDate" 
                type="date"
                value={newCoupon.expiryDate}
                onChange={(e) => setNewCoupon({...newCoupon, expiryDate: e.target.value})}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Label htmlFor="isActive" className="w-24">Active</Label>
              <Switch 
                id="isActive"
                checked={newCoupon.isActive}
                onCheckedChange={(checked) => setNewCoupon({...newCoupon, isActive: checked})}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogTrigger asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogTrigger>
            <Button 
              type="button"
              onClick={createCoupon}
              disabled={!newCoupon.code || !newCoupon.discount || !newCoupon.expiryDate || isLoading}
            >
              {isLoading ? "Creating..." : "Create Coupon"}
            </Button>
          </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Used</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && !coupons.length ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">Loading coupons...</TableCell>
              </TableRow>
            ) : coupons.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">No coupons found. Create your first discount coupon.</TableCell>
              </TableRow>
            ) : (
              coupons.map((coupon) => (
                <TableRow key={coupon.id} className="hover:bg-muted/50">
            <TableCell className="font-medium">{coupon.code}</TableCell>
            <TableCell>{coupon.discount}%</TableCell>
            <TableCell>{new Date(coupon.expiryDate * 1000).toDateString()}</TableCell>
            <TableCell>
              <Badge className={coupon.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                {coupon.isActive ? "Active" : "Inactive"}
              </Badge>
            </TableCell>
            <TableCell>{coupon.usageCount || 0} times</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => toggleCouponStatus(coupon.id, coupon.isActive)}
                >
                  {coupon.isActive ? "Deactivate" : "Activate"}
                </Button>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
            </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          {/* Quick Tips for Coupons */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-sm text-blue-600 dark:text-blue-400">
            <h3 className="font-semibold mb-2">Coupon Best Practices:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Use memorable codes that are easy to type and remember</li>
              <li>Set appropriate expiry dates to create urgency</li>
              <li>Consider adding usage limits for special promotions</li>
              <li>Promote your discount coupons on social media for maximum reach</li>
            </ul>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Quick Tips for Bookings (only shown on bookings tab) */}
      {activeTab === "bookings" && (
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-sm text-blue-600 dark:text-blue-400">
          <h3 className="font-semibold mb-2">Quick Tips:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Use the search bar to quickly find specific bookings</li>
            <li>Filter bookings by date range and status</li>
            <li>Export reports for detailed analysis</li>
            <li>Click on "View Details" to see complete booking information</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Bookings;