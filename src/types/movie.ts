import { Prisma } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";
import { ChangeEvent } from "react";
import { UserType } from "./user";

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
    selectedTime: number
    showDate: number;
    bookingDate: number;
    couponCode?: string;
    discount: number;
    totalPrice: number;
    paymentMethod: PaymentMethod;
}

export interface Booking {
    id?: string;
    userId: number;
    showId: number;
    showDate: number;
    orderId: string;
    paymentRef?: string;
    seatsCount: number;
    paymentMethod: PaymentMethod;
    couponId?: string;
    show?: Show;
    seatsBooked: SeatWithPrice[] | JsonValue;
    totalPrice: number;
    bookingDate: number;
    user?: UserType;
    bookingStatus: BookingStatus;
    tickets?: Ticket[];
    createdAt?: Date;
    updatedAt?: Date;
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

export type ScreenType = 'STANDARD' | 'THREED' | 'IMAX';

export interface Screen {
  id: number;
  screenNumber: number;
  totalSeats: number;
  type: ScreenType;
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

export interface Coupon {
  id: string;
  code: string;
  discount: number;
  expiryDate: number;
  isActive: boolean;
  createdAt: Date;
  usageCount: number;
}

export interface AuthProps {
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}

export type Status = "ACTIVE" | "COMPLETED" | "UPCOMING";
export type BookingStatus = "CONFIRMED" | "CANCELLED" | "PENDING";
export type TicketStatus = "VALID" | "USED" | "CANCELLED" | "PENDING";
export type PaymentMethod = "ESEWA" | "KHALTI";

export interface StepProps {
  movieDetails: MovieDetails;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleGenreChange: (genre: string) => void;
  handleShowtimeChange: (screenId: number, showTime: number) => void;
  handleCastChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handlePriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export type SeatType = 'silver' | 'gold' | 'platinum';

