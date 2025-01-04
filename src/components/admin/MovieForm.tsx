import React, { ChangeEvent, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BasicInfoStep } from './MovieForm/BasicInfo';
import { TechnicalDetailsStep } from './MovieForm/TechnicalDetails';
import { ShowScheduleStep } from './MovieForm/ShowSchedule';
import { PricingStep } from './MovieForm/Pricing';
import { CastCrewStep } from './MovieForm/CastCrew';
import { FormData, StepProps } from '@/types/movie';



const MovieForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    genres: [],
    release_date: '',
    language: '',
    runtime: '',
    age_rating: '',
    poster_url: '',
    showStartDate: (Math.floor(new Date().getTime()/1000)),
    showEndDate: (Math.floor(new Date().getTime()/1000)) + 7 * 24 * 60 * 60,
    showtimes: [],
    pricing: [],
    cast: [],
    director: '',
    status: 'draft'
  });

  const totalSteps = 5;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const convertedValue = name === 'showStartDate' || name === 'showEndDate' ? new Date(value).getTime() / 1000 : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: convertedValue
    }));
  };

  const handleGenreChange = (genre: string) => {
    setFormData((prevData) => ({
      ...prevData,
      genres: prevData.genres.includes(genre) ? prevData.genres.filter((existingGenre) => existingGenre !== genre) : [...prevData.genres, genre]
    }));
  }

  const handleShowtimeChange = (time: number) => {
    setFormData((prev) => ({
      ...prev,
      showtimes: prev.showtimes.includes(time) ? prev.showtimes.filter(show => show !== time) : [...prev.showtimes, time]
    }))
  }

  const handleCastChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      const cast = e.target.value.split(', ');
      setFormData((prevData) => ({
        ...prevData,
        cast
      }));
    };

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

  const renderStep = () => {
    const props: StepProps = {
      formData,
      handleChange,
      handleGenreChange,
      handleShowtimeChange,
      handleCastChange
    };

    switch(step) {
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