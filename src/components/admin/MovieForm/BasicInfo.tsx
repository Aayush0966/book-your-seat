import { imageUrl, searchMovieByTitleApiUrl } from '@/lib/constants';
import { Movie, StepProps } from '@/types/movie';
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Film, Loader2 } from 'lucide-react';

export const BasicInfoStep = ({ movieDetails, handleChange, handleGenreChange }: StepProps) => {
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const genres = [
    'Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime',
    'Documentary', 'Drama', 'Family', 'Fantasy', 'History', 'Horror',
    'Mystery', 'Romance', 'Sci-Fi', 'Sport', 'Thriller', 'War', 'Western'
  ];

  const handleSearchShow = async (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    const query = e.target.value.trim();

    if (!query) {
      setSearchResult([]);
      setShowDropdown(false);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `${searchMovieByTitleApiUrl}?query=${query}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );
      setSearchResult(response.data.results.slice(0, 3)); // Show top 3 results
      setShowDropdown(true);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
    setLoading(false);
  };

 const handleSelectMovie = (selectedMovie:any) => {
  handleChange({ target: { name: "title", value: selectedMovie.title } } as any);
  handleChange({ target: { name: "description", value: selectedMovie.overview } } as any);
  handleChange({ target: { name: "releaseDate", value: selectedMovie.release_date } } as any);
  handleChange({ target: { name: "posterUrl", value: `${imageUrl}/${selectedMovie.poster_path}` } } as any);
  handleChange({ target: { name: "showStartDate", value: selectedMovie.release_date } } as any);
  handleChange({ target: { name: "backdropUrl", value: `${imageUrl}/${selectedMovie.backdrop_path}` } } as any);
  setShowDropdown(false);
};
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Heading */}
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <Film className="w-6 h-6 text-blue-600" />
        Basic Information
      </h2>

      <div className="space-y-4">
        {/* Movie Title with Search */}
        <div className="relative" ref={dropdownRef}>
          <label className="block text-sm font-medium mb-1">Movie Title</label>
          <input
            type="text"
            name="title"
            value={movieDetails.title}
            onChange={handleSearchShow}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition shadow-sm"
            placeholder="Enter movie title"
            required
          />

          {/* Search Dropdown */}
          {showDropdown && (
            <div className="absolute w-full bg-white border rounded-lg mt-1 shadow-lg z-10">
              {loading ? (
                <div className="p-3 flex items-center justify-center text-gray-500">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="ml-2">Searching...</span>
                </div>
              ) : (
                searchResult.map((movie) => (
                  <div
                    key={movie.id}
                    className="p-3 flex items-center gap-3 cursor-pointer hover:bg-gray-100 transition"
                    onClick={() => handleSelectMovie(movie)}
                  >
                    <img
                      src={`${imageUrl}/${movie.poster_path}`}
                      alt={movie.title}
                      className="w-10 h-14 rounded-md object-cover"
                    />
                    <span className="text-sm font-medium">{movie.title}</span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={movieDetails.description}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-blue-500 transition shadow-sm"
            placeholder="Enter movie description"
            required
          />
        </div>

        {/* Release Date */}
        <div>
          <label className="block text-sm font-medium mb-1">Release Date</label>
          <input
            type="date"
            name="releaseDate"
            value={new Date(movieDetails.releaseDate * 1000).toISOString().split('T')[0]}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition shadow-sm"
            required
          />
        </div>

        {/* Genres */}
        <div>
          <label className="block text-sm font-medium mb-2">Genres</label>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => handleGenreChange(genre)}
                className={`px-4 py-2 rounded-full transition-all shadow-sm text-sm ${
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
