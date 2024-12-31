import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Plus, X } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Movie } from '@/types/movie'

const DetailForm = ({setDetails}: {setDetails: (movie: Movie) => void;}) => {
  const [castMembers, setCastMembers] = useState<string[]>([])
  const [cast, setCast] = useState('')

  const handleCastSubmit = () => {
    if (cast.trim()) {
      setCastMembers([...castMembers, cast.trim()])
      setCast('')
    }
  }


  const handleDetails = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const duration = parseInt(formData.get('duration') as string, 10);
    const genre = formData.get('genre') as string;
    const language = formData.get('language') as string;
    const releaseDate = new Date(formData.get('release') as string).getTime();
    const director = formData.get('director') as string;
    const description = formData.get('description') as string;
    const imageUrl = formData.get('imageUrl') as string;
    const movie: Movie = { title, director, duration, genre, castMembers, language, releaseDate, description, imageUrl };
    setDetails(movie);
  }

  const handleCastKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleCastSubmit()
    }
  }

  const removeCastMember = (index: number) => {
    setCastMembers(castMembers.filter((_, i) => i !== index))
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent>
        <form onSubmit={handleDetails} className="grid mt-6 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="title">Movie Title *</Label>
            <Input 
              id="title" 
              name='title'
              placeholder="Enter movie title"
              className="focus-visible:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duration (minutes) *</Label>
            <Input 
              id="duration" 
              type="number" 
              name='duration'
              placeholder="Enter duration"
              min="1"
              className="focus-visible:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="genre">Genre *</Label>
            <Input
              id="genre"
              type='text'
              name='genre'
              placeholder='action, comedy, animation'
              className="focus-visible:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="language">Language *</Label>
            <Select name='language'>
              <SelectTrigger className="focus-visible:ring-blue-500">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="hindi">Hindi</SelectItem>
                <SelectItem value="nepalese">Nepali</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="release">Release Date *</Label>
            <Input 
              id="release" 
              type="date"
              name='release'
              className="focus-visible:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="director">Director</Label>
            <Input 
              id="director" 
              name='director'
              placeholder="Enter director name"
              className="focus-visible:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL *</Label>
            <Input 
              id="imageUrl" 
              name='imageUrl'
              placeholder="Enter image URL"
              className="focus-visible:ring-blue-500"
            />
          </div>

          <div className="space-y-2 col-span-2">
            <Label htmlFor="cast">Cast Members</Label>
            {castMembers.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {castMembers.map((member, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                  >
                    {member}
                    <button
                      onClick={() => removeCastMember(index)}
                      className="hover:text-blue-900"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              <Input 
                placeholder="Add cast member"
                className="flex-1 focus-visible:ring-blue-500"
                value={cast}
                onChange={(e) => setCast(e.target.value)}
                onKeyPress={handleCastKeyPress}
              />
              <Button 
                type="button"
                onClick={handleCastSubmit}
                variant="outline"
                size="icon"
                className="hover:bg-blue-50"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="col-span-2 space-y-2">
            <Label htmlFor="description">Synopsis *</Label>
            <Textarea 
              id="description"
              name='description'
              placeholder="Enter movie synopsis"
              rows={4}
              className="focus-visible:ring-blue-500"
            />
          </div>
          <Button 
            type="submit"
            variant="destructive"
            className="col-span-2 w-fit mx-auto py-2 mt-4"
          >
            Save Movie
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default DetailForm