import { Button } from '@/components/ui/button';
import { Card, CardTitle, CardContent, CardHeader} from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { useShow } from '@/context/showContext';

const UpcomingMovies = () => {
    const {movies} = useShow()

    return (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Upcoming Movies</CardTitle>
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {movies && movies.length > 0 ? (
                movies.slice(0,3).map((movie, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{movie.title}</p>
                      <p className="text-sm text-gray-500">{formatDate(movie.releaseDate)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Age rating: {movie.ageRating}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <p>No upcoming movies available</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
    );
};

export default UpcomingMovies;