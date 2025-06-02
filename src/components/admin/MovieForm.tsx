import { MovieDetails, StepProps } from '@/types/movie';
import axios from 'axios';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import React, { ChangeEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { BasicInfoStep } from './MovieForm/BasicInfo';
import { CastCrewStep } from './MovieForm/CastCrew';
import { PricingStep } from './MovieForm/Pricing';
import { ShowScheduleStep } from './MovieForm/ShowSchedule';
import { TechnicalDetailsStep } from './MovieForm/TechnicalDetails';
import { useShow } from '@/context/showContext';

const MovieForm = ({onSuccess}: {onSuccess: () => void}) => {
  const [step, setStep] = useState(1);
  const { refetchAll } = useShow();
  const [movieDetails, setMovieDetails] = useState<MovieDetails>({
    title: '',
    description: '',
    genres: [],
    releaseDate: Math.floor(new Date().getTime() / 1000),
    language: 'English',
    duration: 120,
    ageRating: '',
    posterUrl: '',
    backdropUrl: '',
    showStartDate: Math.floor(new Date().getTime() / 1000),
    showEndDate: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60,
    showtimes: [],
    pricing: [
      {
        screenId: 1,
        type: "Standard", 
        prices: { platinum: 300, gold: 200, silver: 150 }
      },
      {
        screenId: 2,
        type: "3D",
        prices: { platinum: 400, gold: 300, silver: 250 }
      },
      {
        screenId: 3,
        type: "IMAX", 
        prices: { platinum: 600, gold: 400, silver: 300 }
      }
    ],
    cast: [],
    director: '',
    status: "UPCOMING"
  });

  const [isLoading, setIsLoading] = useState(false);
  const totalSteps = 5;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const convertedValue = name === 'showStartDate' || name === 'showEndDate' || name === 'releaseDate'
      ? new Date(value).getTime() / 1000
      : name === 'duration'
      ? Number(value)
      : value;
    setMovieDetails((prevData) => ({
      ...prevData,
      [name]: convertedValue
    }));
  };

  const handleGenreChange = (genre: string) => {
    setMovieDetails((prevData) => ({
      ...prevData,
      genres: prevData.genres.includes(genre) ? prevData.genres.filter((existingGenre) => existingGenre !== genre) : [...prevData.genres, genre]
    }));
  };

  const handleShowtimeChange = (screenId: number, showTime: number) => {
    setMovieDetails((prev) => ({
      ...prev,
      showtimes: prev.showtimes.some(st => st.screenId === screenId && st.showTime === showTime)
        ? prev.showtimes.filter(st => !(st.screenId === screenId && st.showTime === showTime))
        : [...prev.showtimes, { screenId, showTime }]
    }));
  };

  const handleCastChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const cast = e.target.value.split(', ');
    setMovieDetails((prevData) => ({
      ...prevData,
      cast
    }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const price = parseFloat(e.target.value);
    const screenType = e.target?.dataset.screen;
    const seatType = e.target?.dataset.seat;
    setMovieDetails((prev) => ({
      ...prev,
      pricing: prev.pricing.map((pricing) =>
        pricing.type === screenType
          ? {
              ...pricing,
              prices: {
                ...pricing.prices,
                [seatType?.toLocaleLowerCase() as string]: price,
              },
            }
          : pricing
      ),
    }));
  };

  const validateStep = (currentStep: number): boolean => {
    switch (currentStep) {
      case 1: // Basic Info
        if (!movieDetails.title.trim()) {
          toast.error("Movie title is required");
          return false;
        }
        if (!movieDetails.description.trim()) {
          toast.error("Movie description is required");
          return false;
        }
        if (!movieDetails.releaseDate) {
          toast.error("Release date is required");
          return false;
        }
        if (movieDetails.genres.length === 0) {
          toast.error("Please select at least one genre");
          return false;
        }
        return true;

      case 2: // Technical Details
        if (!movieDetails.language.trim()) {
          toast.error("Language is required");
          return false;
        }
        if (!movieDetails.duration || movieDetails.duration < 1) {
          toast.error("Valid duration is required");
          return false;
        }
        if (!movieDetails.ageRating.trim()) {
          toast.error("Age rating is required");
          return false;
        }
        if (!movieDetails.posterUrl.trim()) {
          toast.error("Poster URL is required");
          return false;
        }
        return true;

      case 3: // Show Schedule
        if (!movieDetails.showStartDate) {
          toast.error("Show start date is required");
          return false;
        }
        if (!movieDetails.showEndDate) {
          toast.error("Show end date is required");
          return false;
        }
        if (movieDetails.showtimes.length === 0) {
          toast.error("Please select at least one showtime");
          return false;
        }
        return true;

      case 4: // Pricing
        if (!movieDetails.pricing.length) {
          toast.error("Pricing information is required");
          return false;
        }
        for (const price of movieDetails.pricing) {
          if (!price.prices.platinum || !price.prices.gold || !price.prices.silver) {
            toast.error(`Please set all prices for ${price.type} screen`);
            return false;
          }
        }
        return true;

      case 5: // Cast & Crew
        if (!movieDetails.director.trim()) {
          toast.error("Director name is required");
          return false;
        }
        if (movieDetails.cast.length === 0) {
          toast.error("Please add at least one cast member");
          return false;
        }
        return true;

      default:
        return true;
    }
  };

  const nextStep = () => {
    if (!validateStep(step)) return;
    
    if (step === totalSteps) {
      handleMovieSubmit();
    } else {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const renderProgressBar = () => (
    <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
      <div
        className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-in-out"
        style={{ width: `${(step / totalSteps) * 100}%` }}
      />
    </div>
  );

  const handleMovieSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/admin/movie', { movieDetails });
      if (response.statusText !== 'Created') {
        toast.error("Something went wrong");
      } else {
        toast.success('Movie added successfully');
        await refetchAll();
      }
    } catch (error) {
      toast.error("An error occurred during submission");
    } finally {
      onSuccess()
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    const props: StepProps = {
      movieDetails,
      handleChange,
      handleGenreChange,
      handleShowtimeChange,
      handleCastChange,
      handlePriceChange
    };

    switch (step) {
      case 1: return <BasicInfoStep {...props} />;
      case 2: return <TechnicalDetailsStep {...props} />;
      case 3: return <ShowScheduleStep {...props} />;
      case 4: return <PricingStep {...props} />;
      case 5: return <CastCrewStep {...props} />;
      default: return null;
    }
  };

  return (
    <div className="max-w-screen-xl h-[80vh] flex flex-col p-4 md:p-6 bg-white rounded-xl">
      {renderProgressBar()}

      <div className="flex-1 overflow-y-auto w-full max-w-3xl min-w-[500px] py-4">
        {renderStep()}
      </div>

      <div className="flex justify-between mt-6 pt-4 border-t border-gray-200 flex-shrink-0">
        <button
          onClick={prevStep}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            step === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
          }`}
          disabled={step === 1 || isLoading}
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
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="animate-spin w-4 h-4" />
          ) : step === totalSteps ? (
            'Submit'
          ) : (
            <>
              Next
              <ChevronRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default MovieForm;
