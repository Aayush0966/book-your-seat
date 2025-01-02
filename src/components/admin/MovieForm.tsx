import React, { useState, JSX } from 'react';
import { ChevronLeft, ChevronRight, Film, Clock, Calendar, Users, DollarSign } from 'lucide-react';
import { Price } from '@/types/movie';

const MovieForm = () => {
  const [step, setStep] = useState(1);
  interface FormData {
    title: string;
    description: string;
    genres: string[];
    release_date: string;
    language: string;
    runtime: string;
    age_rating: string;
    poster_url: string;
    show_dates: {
      start_date: string;
      end_date: string;
    };
    showtimes: string[];
    pricing: Price[];
    cast: string[];
    director: string;
    status: string;
  }
  
  const [formData] = useState<FormData>({
    title: '',
    description: '',
    genres: [],
    release_date: '',
    language: '',
    runtime: '',
    age_rating: '',
    poster_url: '',
    show_dates: {
      start_date: '',
      end_date: ''
    },
    showtimes: [],
    pricing: [],
    cast: [],
    director: '',
    status: 'draft'
  });

  const totalSteps = 5;


  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const renderProgressBar = () => (
    <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
      <div 
        className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-in-out"
        style={{ width: `${(step / totalSteps) * 100}%` }}
      />
    </div>
  );

  // const StepIcon = ({ step }: { step: number }) => {
  //   const icons: { [key: number]: JSX.Element } = {
  //     1: <Film className="w-6 h-6" />,
  //     2: <Clock className="w-6 h-6" />,
  //     3: <Calendar className="w-6 h-6" />,
  //     4: <DollarSign className="w-6 h-6" />,
  //     5: <Users className="w-6 h-6" />
  //   };
  //   return icons[step] || null;
  // };

  const renderStep = () => {
    switch(step) {
      case 1:
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
                  value={formData.title}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Enter movie title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  className="w-full p-2 border rounded-lg h-32 focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Enter movie description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Genres</label>
                <div className="flex flex-wrap gap-2">
                  {['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Thriller', 'Horror'].map(genre => (
                    <button
                      key={genre}
                      className={`px-4 py-2 rounded-full transition-all ${
                        formData.genres.includes(genre)
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

      case 2:
        return (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Clock className="w-6 h-6" />
              Technical Details
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Runtime (minutes)</label>
                <input
                  type="number"
                  name="runtime"
                  value={formData.runtime}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Language</label>
                <select
                  name="language"
                  value={formData.language}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                >
                  <option value="">Select language</option>
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Age Rating</label>
                <select
                  name="age_rating"
                  value={formData.age_rating}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                >
                  <option value="">Select rating</option>
                  <option value="G">G</option>
                  <option value="PG">PG</option>
                  <option value="PG-13">PG-13</option>
                  <option value="R">R</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Poster URL</label>
                <input
                  type="url"
                  name="poster_url"
                  value={formData.poster_url}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="https://"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Calendar className="w-6 h-6" />
              Show Schedule
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Start Date</label>
                  <input
                    type="date"
                    name="show_dates.start_date"
                    value={formData.show_dates.start_date}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">End Date</label>
                  <input
                    type="date"
                    name="show_dates.end_date"
                    value={formData.show_dates.end_date}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Showtimes</label>
                <div className="flex flex-wrap gap-2">
                  {['10:00 AM', '01:00 PM', '05:00 PM', '09:00 PM'].map(time => (
                    <button
                      key={time}
                      className={`px-4 py-2 rounded-full transition-all ${
                        formData.showtimes.includes(time)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <DollarSign className="w-6 h-6" />
              Pricing
            </h2>
            
            {['Standard', '3D', 'IMAX'].map((screenType, index) => (
              <div key={screenType} className="p-4 border rounded-lg space-y-4">
                <h3 className="font-semibold">{screenType} Screen</h3>
                <div className="grid grid-cols-3 gap-4">
                  {['Platinum', 'Gold', 'Silver'].map(seatType => (
                    <div key={seatType} className="space-y-2">
                      <label className="block text-sm font-medium">{seatType}</label>
                      <input
                        type="number"
                        name={`pricing.${index}.seatCategory.${seatType.toLowerCase()}`}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                        placeholder="Price"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Users className="w-6 h-6" />
              Cast & Crew
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Director</label>
                <input
                  type="text"
                  name="director"
                  value={formData.director}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Enter director's name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Cast (comma-separated)</label>
                <textarea
                  name="cast"
                  value={formData.cast.join(', ')}
                  className="w-full p-2 border rounded-lg h-32 focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Enter cast members, separated by commas"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      {renderProgressBar()}
      
      <div className="min-h-[500px]">
        {renderStep()}
      </div>
      
      <div className="flex justify-between mt-8">
        <button
          onClick={prevStep}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            step === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
          }`}
          disabled={step === 1}
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        <button
          onClick={nextStep}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            step === totalSteps
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {step === totalSteps ? 'Submit' : 'Next'}
          {step !== totalSteps && <ChevronRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};

export default MovieForm;