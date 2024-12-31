import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus, Calendar, Clock, X } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Show } from '@/types/movie'



const ShowtimeForm = ({setShow}: {setShow: (shows: Show[]) => void}) => {
 const [screen, setScreen] = React.useState<string>('')
 const [shows, setShows] = React.useState<Show[]>([])
 const [error, setError] = React.useState<string>('')

 const handleScreenChange = (value: string) => {
  setScreen(value)
  if (!shows.find(sh => sh.screenNumber === value)) {  
    const newShowTime = {
      screenNumber : value,  
      startDate : Date.now(), // Changed to Unix timestamp
      endDate : Date.now(), // Changed to Unix timestamp
      showTimes: []
    }
     setShows([...shows, newShowTime ])
  }
 }

 const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
  setError('')
  const newDate = new Date(e.target.value).getTime() // Convert to Unix timestamp
  const showIndex = shows.findIndex(sh => sh.screenNumber === screen)
  if (showIndex === -1) return

  if (type === 'start') {
    if (newDate < Date.now()) {
      setError('The Start Date must be a future date')
      return
    }
    setShows(prevShows => prevShows.map((show, idx) => 
      idx === showIndex ? { ...show, startDate: newDate } : show
    ))
  } else {
    if (newDate < shows[showIndex].startDate) {
      setError('End Date cannot be past of start date')
      return
    }
    setShows(prevShows => prevShows.map((show, idx) => 
      idx === showIndex ? { ...show, endDate: newDate } : show
    ))
  }
 }

 const handleShowTime = () => {
  setShows(prevShows => 
    prevShows.map(show => 
      show.screenNumber === screen 
        ? { ...show, showTimes: [...show.showTimes, ''] } 
        : show
    )
  );
 }

 const handleShowTimeChange = (index: number, value: string) => {
  setShows(prevShows => prevShows.map(show => 
    show.screenNumber === screen 
      ? { ...show, showTimes: show.showTimes.map((time, i) => i === index ? value : time) }
      : show
  ))
 }

 const removeShowTime = (index: number) => {
  setShows(prevShows => prevShows.map(show => 
    show.screenNumber === screen 
      ? { ...show, showTimes: show.showTimes.filter((_, i) => i !== index) }
      : show
  ))
 }


 const saveShows = () => {
   setShow(shows)
 }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Screen *</Label>
              <Select required value={screen} onValueChange={handleScreenChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select screen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="screen0">Screen 1 - IMAX</SelectItem>
                  <SelectItem value="screen1">Screen 2 - 3D</SelectItem>
                  <SelectItem value="screen2">Screen 3 - Standard</SelectItem>
                </SelectContent>
              </Select>
            </div>

           {screen && <div className="space-y-2">
              <Label>Show Date Range *</Label>
              <div className="flex gap-4 flex-wrap">
                <div className="relative">
                  <Input onChange={(e) => handleDateChange(e, 'start')} type="date" className="pl-10" />
                  <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                <div className="relative ">
                  <Input onChange={(e) => handleDateChange(e, 'end')} type="date" className="pl-10" />
                  <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
            </div>}
          </div>

          {screen && <div className="mt-6">
            <Label>Show Times</Label>
            <div className="mt-2 space-y-4">
              {shows.find(sh => sh.screenNumber === screen)?.showTimes.map((time, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="relative flex-1">
                    <Input 
                      type="time" 
                      className="pl-10"
                      value={time}
                      onChange={(e) => handleShowTimeChange(index, e.target.value)}
                    />
                    <Clock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                  <Button 
                    variant="destructive" 
                    size="icon"
                    onClick={() => removeShowTime(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              type='button'
              className="mt-4 w-full" 
              size="lg"
              onClick={handleShowTime}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Show Time
            </Button>
            <div className="flex justify-center mt-4">
              <Button 
              onClick={saveShows}
              variant="destructive"
              className="py-2"
              >
              Save Shows
              </Button>
            </div>
          </div>}
        </CardContent>
      </Card>
    </div>
  )
}

export default ShowtimeForm