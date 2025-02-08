import { Prisma } from "@prisma/client";
import { ChangeEvent } from "react";

export interface Movie {
    title: string;
    genres: Prisma.InputJsonValue;
    duration: number;
    description: string;
    director: string;
    posterUrl : string;
    releaseDate: number;
    language: string;
    ageRating: string,
    casts: Prisma.InputJsonValue;
}


export interface Store {
    items: Movie[]
    isLoading: boolean
    error: string | null
    fetchItems: () => void
  }

export interface Pricing {
  platinum: number;
  gold: number;
  silver: number;
}

export interface Price {
  screenId: number;
  type: string;
  prices: Pricing;
}

export type Showtime = {
    screenId: number;
    showTime: number;
};

export interface MovieDetails {
  title: string;
  description: string;
  genres: string[];
  releaseDate: number;
  backdropUrl: string;
  language: string;
  duration: number;
  ageRating: string;
  posterUrl: string;
  showStartDate: number;
  showEndDate: number;
  showtimes: Showtime[];
  pricing: Price[];
  cast: string[];
  director: string;
  status: Status;
}

export interface AuthProps {
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}

export type Status = "ACTIVE" | "COMPLETED" | "UPCOMING";

export interface StepProps {
  movieDetails: MovieDetails;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleGenreChange: (genre: string) => void;
  handleShowtimeChange: (screenId: number, showTime: number) => void;
  handleCastChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handlePriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}