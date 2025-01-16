import { StepProps } from '@/types/movie';
import { Film } from 'lucide-react';

export const BasicInfoStep = ({ movieDetails, handleChange, handleGenreChange } : StepProps) => {
  const genres = [
    'Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime',
    'Documentary', 'Drama', 'Family', 'Fantasy', 'History', 'Horror',
    'Mystery', 'Romance', 'Sci-Fi', 'Sport', 'Thriller', 'War', 'Western'
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <Film className="w-6 h-6" />
        Basic Information
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Movie Title</label>
          <input
            type="text"
            name="title"
            value={movieDetails.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Enter movie title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={movieDetails.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg h-32 focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Enter movie description"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Release Date</label>
          <input
            type="date"
            name="releaseDate"
            
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Genres</label>
          <div className="flex flex-wrap gap-2">
            {genres.map(genre => (
              <button
                key={genre}
                onClick={() => handleGenreChange(genre)}
                className={`px-4 py-2 rounded-full transition-all ${
                  movieDetails.genres.includes(genre)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};