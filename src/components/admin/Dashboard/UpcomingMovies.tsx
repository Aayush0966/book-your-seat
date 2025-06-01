import { Button } from '@/components/ui/button';
import { Card, CardTitle, CardContent, CardHeader} from '@/components/ui/card';
import { Calendar, Film } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { useShow } from '@/context/showContext';

const UpcomingMovies = () => {
    const {movies} = useShow()

    // Filter only upcoming movies and sort by release date (soonest first)
    const upcomingMovies = movies 
      ? movies
          .filter(movie => movie.status === 'UPCOMING')
          .sort((a, b) => new Date(a.releaseDate * 1000).getTime() - new Date(b.releaseDate * 1000).getTime())
          .slice(0, 3)
      : [];

    return (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Film className="w-5 h-5 text-purple-600" />
              <CardTitle>Upcoming Movies</CardTitle>
            </div>
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingMovies && upcomingMovies.length > 0 ? (
                upcomingMovies.map((movie, index) => (
                  <div key={movie.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">{movie.title}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Releases on {formatDate(movie.releaseDate)}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        {Array.isArray(movie.genres) ? movie.genres.join(', ') : 'N/A'}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-full font-medium">
                          Coming Soon
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Age: {movie.ageRating}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Film className="w-12 h-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                  <p className="text-lg font-medium">No upcoming movies</p>
                  <p className="text-sm">New releases will appear here</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
    );
};

export default UpcomingMovies;