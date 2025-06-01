import LoadingSpinner from '@/components/ui/loading-spinner';
import { Ticket, Film } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen pt-24 pb-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
          {/* Animated Icons */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full blur-xl animate-pulse"></div>
            <div className="relative flex items-center space-x-4">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full">
                <Film className="w-8 h-8 text-primary animate-bounce" />
              </div>
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full">
                <Ticket className="w-8 h-8 text-primary animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>

          {/* Loading Spinner */}
          <LoadingSpinner 
            size="lg" 
            text="Loading movie details..."
            className="text-white"
          />

          {/* Loading Steps */}
          <div className="space-y-3 text-center">
            <div className="flex items-center justify-center space-x-2 text-white/80">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm">Preparing your booking experience</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-white/60">
              <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <span className="text-sm">Loading showtimes and seats</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-white/40">
              <div className="w-2 h-2 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              <span className="text-sm">Almost ready...</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full max-w-md">
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 