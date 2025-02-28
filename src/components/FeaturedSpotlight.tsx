import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Clock, Star } from "lucide-react";
import { Movie } from "@/types/movie";

export default function FeaturedSpotlight({ show }: { show: Movie }) {
  return (
    <div className="container mx-auto px-4">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#000000]/30 via-[#000000]/20 to-secondary/20 ">
        <div className="absolute inset-0 z-0">
          <Image
            src={show.backdropUrl || "/api/placeholder/1200/600"}
            alt={show.title}
            className="object-cover transform scale-105 hover:scale-110 transition-transform duration-700 opacity-80"
            fill
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/40 to-transparent backdrop-blur-[1px] z-[1]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,0,0,0.8)_0%,transparent_60%)] z-[1]" />
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 p-8 md:p-16">
          <div className="flex flex-col justify-center">
            <Badge variant="outline" className="w-fit mb-6 bg-indigo-900/80 backdrop-blur-sm border-indigo-400 text-indigo-50">
              Featured Show
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200 drop-shadow-md">
              {show.title}
            </h1>
            <div className="flex items-center gap-4 mb-6 text-sm">
              <div className="flex items-center gap-1 bg-amber-600/90 px-3 py-1.5 rounded-full text-white shadow-md">
                <Star className="w-4 h-4 text-amber-200 fill-amber-200" />
                <span>{"4.8"}/5</span>
              </div>
              <div className="flex items-center gap-1 bg-blue-700/80 px-3 py-1.5 rounded-full text-blue-50 shadow-md">
                <Clock className="w-4 h-4" />
                <span>{show.duration || "120 min"}</span>
              </div>
              <div className="flex items-center gap-1 bg-emerald-700/80 px-3 py-1.5 rounded-full text-emerald-50 shadow-md">
                <CalendarIcon className="w-4 h-4" />
                <span>{show.releaseDate || "Now Showing"}</span>
              </div>
            </div>
            <p className="mb-8 text-lg text-gray-100 leading-relaxed backdrop-blur-[2px] bg-black/10 p-4 rounded-md">
              {show.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium">
                Book Now
              </Button>
  
            </div>
          </div>
          <div className="relative aspect-[2/3] mx-auto max-w-xs md:max-w-none group">
            <div className="absolute inset-0 rounded-xl overflow-hidden shadow-2xl transform transition-transform duration-500 group-hover:scale-105">
              <Image
                src={show.posterUrl || "/api/placeholder/400/600"}
                alt={show.title}
                className="object-cover"
                fill
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
