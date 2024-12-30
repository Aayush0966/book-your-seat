import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const PricingForm = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">Standard Pricing</CardTitle>
            <Switch />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Seat Category</TableHead>
                <TableHead>Regular (NPR)</TableHead>
                <TableHead>Premium (NPR)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {['Platinum', 'Gold', 'Silver'].map((category) => (
                <TableRow key={category}>
                  <TableCell className="font-medium">{category}</TableCell>
                  <TableCell>
                    <Input type="number" placeholder="0.00" className="w-32" />
                  </TableCell>
                  <TableCell>
                    <Input type="number" placeholder="0.00" className="w-32" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">Special Pricing</CardTitle>
            <Switch />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <Label>Student Discount (%)</Label>
              <Input type="number" placeholder="Enter discount percentage" className="mt-2" />
            </div>
            <div>
              <Label>Senior Citizen Discount (%)</Label>
              <Input type="number" placeholder="Enter discount percentage" className="mt-2" />
            </div>
            <div>
              <Label>Military Discount (%)</Label>
              <Input type="number" placeholder="Enter discount percentage" className="mt-2" />
            </div>
            <div>
              <Label>Group Booking Discount (%)</Label>
              <Input type="number" placeholder="Enter discount percentage" className="mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PricingForm