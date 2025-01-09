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

const MovieForm = () => {
  const [step, setStep] = useState(1);
  const [movieDetails, setMovieDetails] = useState<MovieDetails>({
    title: '',
    description: '',
    genres: [],
    releaseDate: (Math.floor(new Date().getTime() / 1000)),
    language: '',
    duration: 120,
    ageRating: '',
    posterUrl: '',
    showStartDate: (Math.floor(new Date().getTime() / 1000)),
    showEndDate: (Math.floor(new Date().getTime() / 1000)) + 7 * 24 * 60 * 60,
    showtimes: [],
    pricing: [
      {
        screenId: 1,
        type: "Standard",
        prices: { platinum: 150, gold: 200, silver: 300 }
      },
      {
        screenId: 2,
        type: "3D",
        prices: { platinum: 250, gold: 300, silver: 400 }
      },
      {
        screenId: 3,
        type: "IMAX",
        prices: { platinum: 300, gold: 400, silver: 600 }
      }
    ],
    cast: [],
    director: '',
    status: 'draft'
  });

  const [isLoading, setIsLoading] = useState(false);
  const totalSteps = 5;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const convertedValue = name === 'showStartDate' || name === 'showEndDate' || name === 'releaseDate' ? new Date(value).getTime() / 1000 : value;
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

  const nextStep = () => {
    if (step === totalSteps) handleMovieSubmit();
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

  const handleMovieSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/admin/movie', { movieDetails });
      if (response.statusText !== 'OK') {
        toast.error("Something went wrong");
      } else {
        toast.success('Movie added successfully');
      }
    } catch (error) {
      toast.error("An error occurred during submission");
    } finally {
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
