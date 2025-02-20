'use client'
import { MovieWithShows, Show } from "@/types/movie";
import { useContext, createContext, useState, useEffect } from "react";

interface BookingContextType {
    step: Step;
    setStep: (step: Step) => void;
    selectedShow?: Show;
    setSelectedShow: (show: Show) => void;
    selectedSeats: string[];
    setSelectedSeats: (seats: string[]) => void;
    selectedDate: Date | null;
    setSelectedDate: (date: Date) => void;
}

type Step = "DateBook" | "SeatBook" | "Payment";

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
    const context = useContext(BookingContext);
    if (!context) {
        throw new Error("useBooking must be used within a BookingProvider");
    }
    return context;
};

interface BookingProviderProps {
    children: React.ReactNode;
}

export const BookingProvider: React.FC<BookingProviderProps> = ({ children }) => {
    const [step, setStep] = useState<Step>("DateBook");
    const [selectedShow, setSelectedShow] = useState<Show>();
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    useEffect(() => {
        if (step === 'DateBook') {
            setSelectedSeats([])
        }
    }, [step])
    return (
        <BookingContext.Provider value={{ step, selectedDate, setSelectedDate, setStep, setSelectedSeats, selectedSeats, selectedShow, setSelectedShow }}>
            {children}
        </BookingContext.Provider>
    );
};