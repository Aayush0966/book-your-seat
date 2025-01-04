import { ChangeEvent } from "react";

export interface Movie {
    title: string;
    genres: string[];
    duration: number;
    description: string;
    director: string;
    imageUrl : string;
    releaseDate: number;
    language: string;
    casts: string[];
}

export interface Show {
    startDate: number
    endDate : number
    screenNumber : string
    showTimes: string[]
    Price?: Price[]
}


export interface Store {
    items: Movie[]
    isLoading: boolean
    error: string | null
    fetchItems: () => void
  }

export interface FormData {
  title: string;
  description: string;
  genres: string[];
  release_date: string;
  language: string;
  runtime: string;
  age_rating: string;
  poster_url: string;
  showStartDate: number;
  showEndDate: number;
  showtimes: number[];
  pricing: Price[];
  cast: string[];
  director: string;
  status: string;
}

export interface Pricing {
  [key: string]: number;
}

export interface Price {
  type: string;
  prices: Pricing;
}

export interface AuthProps {
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}

export interface StepProps {
  formData: FormData;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleGenreChange: (genre: string) => void;
  handleShowtimeChange: (time: number) => void;
  handleCastChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handlePriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}