import React, { useState, ChangeEvent } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BasicInfoStep } from './MovieForm/BasicInfo';
import { TechnicalDetailsStep } from './MovieForm/TechnicalDetails';
import { ShowScheduleStep } from './MovieForm/ShowSchedule';
import { PricingStep } from './MovieForm/Pricing';
import { CastCrewStep } from './MovieForm/CastCrew';

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
  pricing: any[];
  cast: string[];
  director: string;
  status: string;
}

export interface StepProps {
  formData: FormData;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleGenreChange: (genre: string) => void;
  handleShowtimeChange: (time: string) => void;
  handleCastChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGenreChange = (genre: string) => {
    setFormData(prev => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre]
    }));
  };

  const handleShowtimeChange = (time: string) => {
    setFormData(prev => ({
      ...prev,
      showtimes: prev.showtimes.includes(time)
        ? prev.showtimes.filter(t => t !== time)
        : [...prev.showtimes, time]
    }));
  };

  const handleCastChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const castArray = e.target.value.split(',').map(item => item.trim());
    setFormData(prev => ({
      ...prev,
      cast: castArray
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