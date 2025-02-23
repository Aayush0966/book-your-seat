import { Prisma } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";
import { ChangeEvent } from "react";

export interface Movie {
    id? : number;
    title: string;
    genres: JsonValue;
    duration: number;
    description: string;
    director: string;
    backdropUrl: string;
    posterUrl : string;
    releaseDate: number;
    language: string;
    ageRating: string,
    casts: JsonValue;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
}

export interface Show {
  id: number;
  endDate: number;
  startDate: number;
  screenId: number;
  movieId: number;
  showTime: number;
  updatedAt: Date;
  createdAt: Date;
  bookings?: Booking[];
  movie?: Movie;
  screen?: Screen;
  pricing?: Price[] | JsonValue;
}

export interface MovieWithShows extends Movie {
  shows: Show[];
}

export interface TicketDetails extends Ticket {
  movieName: string;
  date: number;
  time: number;
  hallNumber: number;
  seats: SeatWithPrice[] | JsonValue;
}

export interface SeatWithPrice {
    seat: string;
    price: number;
}

export interface BookingRequest {
    showId: number;
    seatsBooked: SeatWithPrice[];
    showDate: number;
    bookingDate: number;
    totalPrice: number;
}

export interface Booking {
    id?: string;
    userId: number;
    showId: number;
    showDate: number;
    seatsCount: number;
    show?: Show;
    seatsBooked: SeatWithPrice[] | JsonValue; // Modified this line
    totalPrice: number;
    bookingDate: number;
    bookingStatus: BookingStatus;
    tickets?: Ticket[];
}

export interface Ticket {
    ticketId: string;
    bookingId: string;
    seatNumber: string;
    seatCategory: string;
    price: number;
    status: TicketStatus;
}

export interface BookingDetails extends Booking {
    movieName: string;
    time: number;
    hallNumber: number;
    tickets: Ticket[];
}

export interface Screen {
  id: number;
  screenNumber: number;
  totalSeats: number;
  type: string
  createdAt: Date;
  updatedAt: Date;
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
export type BookingStatus = "CONFIRMED" | "CANCELLED";
export type TicketStatus = "VALID" | "USED" | "CANCELLED";

export interface StepProps {
  movieDetails: MovieDetails;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleGenreChange: (genre: string) => void;
  handleShowtimeChange: (screenId: number, showTime: number) => void;
  handleCastChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handlePriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export type SeatType = 'silver' | 'gold' | 'platinum';

