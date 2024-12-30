import React from 'react'
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from '../ui/button'
import { Price } from '@/types/movie'

const PricingForm = ({setPrice}: {setPrice: (prices:Price[]) => void}) => {




const defaultPrice: Price[] = [
  {
  screenId : 'screen0',
  seatCategory: [
    {
      seatType: 'platinum',
      price: 400
    },
    {
      seatType: 'gold',
      price: 250
    },
    {
      seatType: 'silver',
      price: 150
    }
  ],
},
{
  screenId : 'screen1',
  seatCategory: [
    {
      seatType: 'platinum',
      price: 550
    },
    {
      seatType: 'gold',
      price: 400
    },
    {
      seatType: 'silver',
      price: 300
    }
  ],
},
{
  screenId : 'screen2',
  seatCategory: [
    {
      seatType: 'platinum',
      price: 800
    },
    {
      seatType: 'gold',
      price: 600
    },
    {
      seatType: 'silver',
      price: 400
    }
  ],
}]

  const screenIds = [
    { id: 'screen0', name: 'Standard', basePrice: '400' },
    { id: 'screen1', name: '3D', basePrice: '600' },
    { id: 'screen2', name: 'IMAX', basePrice: '800' },
  ]
  const [prices, setPrices ] = React.useState<Price[]>(defaultPrice);
  
  const handlePrice = (screen: string, seatType: string, newPrice: number) => {
   setPrices((prevPrices) => 
    prevPrices.map((price) => 
      price.screenId === screen ?
     {...price, 
      seatCategory: price.seatCategory.map((seat) => 
        seat.seatType.toLowerCase() === seatType.toLowerCase() ?
      {...seat, price: newPrice} : seat
      )
     } : price
  ))
  }

  const savePrices = () => {
   setPrice(prices)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="screen0">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          {screenIds.map(screen => (
            <TabsTrigger key={screen.id} value={screen.id}>{screen.name}</TabsTrigger>
          ))}
        </TabsList>

        {screenIds.map(screen => (
          <TabsContent key={screen.id} value={screen.id}>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium">{screen.name} Screen Pricing</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Seat Category</TableHead>
                      <TableHead>Regular (NPR)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {prices.find(pr => pr.screenId === screen.id)?.seatCategory.map((seat) => (
                      <TableRow key={seat.seatType}>
                        <TableCell className="font-medium">{seat.seatType}</TableCell>
                        <TableCell>
                          <Input 
                            type="number" 
                            value={seat.price}
                            className="w-32" 
                            onChange={(e) => handlePrice(screen.id, seat.seatType, Number(e.target.value))}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        ))}

      </Tabs>
      <div className="flex justify-center mt-4">
        <Button 
        onClick={savePrices}
        variant="destructive"
        className="py-2"
        >
        Save Price
        </Button>
      </div>
    </div>
  )
}

export default PricingForm