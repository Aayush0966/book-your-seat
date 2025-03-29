import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Clock, Star, PlayCircle, Info } from "lucide-react";
import { Movie } from "@/types/movie";
import Link from "next/link";

export default function FeaturedSpotlight({ show }: { show: Movie }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#000000]/30 via-[#000000]/20 to-secondary/20 shadow-xl">
        <div className="absolute inset-0 z-0">
          <Image
            src={show.backdropUrl || "/api/placeholder/1200/600"}
            alt=""
            aria-hidden="true"
            className="object-cover transition-all duration-1000 opacity-80 hover:opacity-90"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
          />
        </div>
        
        <div className="absolute inset-0  to-transparent backdrop-blur-sm z-[1]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,0,0,0.85)_0%,transparent_70%)] z-[1]" />
        
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 p-6 sm:p-8 md:p-12 lg:p-16">
          <div className="flex flex-col justify-center">
            <Badge 
              variant="outline" 
              className="w-fit mb-6 bg-indigo-900/80 backdrop-blur-sm border-indigo-400 text-indigo-50 py-1 px-3 animate-pulse"
            >
              Featured Show
            </Badge>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-200 drop-shadow-md">
              {show.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-3 mb-6 text-sm">
              <div className="flex items-center gap-1.5 bg-amber-600/90 px-3 py-1.5 rounded-full text-white shadow-md">
                <Star className="w-4 h-4 text-amber-200 fill-amber-200" />
                <span className="font-medium">{"4.8"}/5</span>
              </div>
              <div className="flex items-center gap-1.5 bg-blue-700/80 px-3 py-1.5 rounded-full text-blue-50 shadow-md">
                <Clock className="w-4 h-4" />
                <span className="font-medium">{show.duration + ' min' || "120 min"}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-700/80 px-3 py-1.5 rounded-full text-emerald-50 shadow-md">
                <CalendarIcon className="w-4 h-4" />
                <span className="font-medium">{new Date(show.releaseDate * 1000).toLocaleDateString() || "Now Showing"}</span>
              </div>
            </div>
            
            <p className="mb-8 text-base md:text-lg text-gray-100 leading-relaxed backdrop-blur-sm bg-black/20 p-4 rounded-md max-w-xl">
              {show.description}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link href={`/show/${show.id}`}>
                <Button 
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium px-6 py-5 text-base md:text-lg shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 flex items-center gap-2 rounded-full"
                  aria-label="Book tickets for this show"
                >
                  <span>Book Now</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 transition-transform group-hover:translate-x-1"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </Button>
              </Link>
              
              <Link href={`/show/${show.id}/details`}>
                <Button 
                  className="bg-transparent hover:bg-gray-800/50 text-white font-medium px-6 py-5 text-base md:text-lg transition-all duration-300 flex items-center gap-2 rounded-full border border-gray-500 hover:border-gray-400"
                  variant="outline"
                  aria-label="More information about this show"
                >
                  <Info className="w-5 h-5 text-gray-300" />
                  <span className="text-sm text-gray-300">More Info</span>
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative aspect-[2/3] mx-auto max-w-xs md:max-w-none group">
            <div className="absolute inset-0 rounded-xl overflow-hidden shadow-2xl transform transition-all duration-500 group-hover:scale-105 group-hover:rotate-1 group-hover:shadow-indigo-500/30">
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Image
                src={show.posterUrl || "/api/placeholder/400/600"}
                alt={`Movie poster for ${show.title}`}
                className="object-cover"
                fill
                sizes="(max-width: 768px) 300px, 400px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}