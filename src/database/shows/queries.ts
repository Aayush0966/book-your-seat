import { MovieWithShows, MovieDetails, Pricing, Showtime, Status, Price, Booking, Ticket, TicketStatus, SeatWithPrice } from "@/types/movie";
import prisma from "@/lib/prisma"; 
import { Prisma, BookingStatus } from "@prisma/client"; // Import the BookingStatus enum

export const createMovie = async (movieDetails: MovieDetails) => {
    const movieData = {
        title: movieDetails.title,
        description: movieDetails.description,
        director: movieDetails.director,
        posterUrl: movieDetails.posterUrl,
        ageRating: movieDetails.ageRating,
        backdropUrl: movieDetails.backdropUrl,
        genres: movieDetails.genres as unknown as Prisma.InputJsonValue,
        casts: movieDetails.cast as unknown as Prisma.InputJsonValue,
        language: movieDetails.language,
        duration: movieDetails.duration,
        releaseDate: movieDetails.releaseDate,
        status: movieDetails.status
    };

    return await prisma.movie.create({ data: movieData });
};

export const checkExistingShow = async (screenId: number, showTime: number) => {
    return await prisma.show.findFirst({
        where: {
            screenId,
            AND: [
                { showTime: { lte: showTime } },
                { endDate: { gte: showTime } },
            ],
        },
    });
};

export const createShow = async (movieId: number, prices: Price[], showtime: Showtime, showStartDate: number, showEndDate: number) => {
    try {

        if (!movieId || !showtime.screenId || !showtime.showTime || !showStartDate || !showEndDate) {
            throw new Error('Missing required fields for show creation');
        }

        const showData = {
            movieId,
            screenId: showtime.screenId,
            showTime: showtime.showTime,
            startDate: showStartDate,
            endDate: showEndDate,
            pricing: prices as unknown as Prisma.InputJsonValue
        };


        const createdShow = await prisma.show.create({
            data: showData
        });


        return createdShow;

    } catch (error) {
        console.error("Error in createShow:", error);
        throw error;
    }
};

export const fetchShows = async (movieId: number) => {
    const shows = await prisma.show.findMany({
        where: {
            movieId
        }
    });
    return shows ? shows : null;
}

export const fetchScreenById = (screenId: number) => {
    const screen = prisma.screen.findUnique({
        where: {
            id: screenId
        }
    })
    return screen ?? null;
}


export const fetchMoviesByStatus = async (status: Status) => {
    const movie = await prisma.movie.findMany({
        where: {
            status: status
        },
        
    })
    return movie ? movie: null
}

export const fetchMovies = async () => {
    const movies = await prisma.movie.findMany();
    return movies ? movies : null;
}

export const fetchBookings = async () => {
    const bookings = await prisma.booking.findMany({
        include: {
            user: true
        }
    });
    return bookings ?? null;
}

export const fetchMovieWithShowsById = async (movieId: number): Promise<MovieWithShows | null> => {
    const movie = await prisma.movie.findFirst({
        where: {
            id: movieId
        },
        include: {
            shows: {
                include: {
                    bookings: true,
                    screen: true,
                },
            },
        },
    });

    return movie ? (movie as unknown as MovieWithShows) : null;
}


export const createBooking = async (bookingDetail: Booking) => {
    const booking = await prisma.booking.create({
        data: {
            id: bookingDetail.id,
            userId: bookingDetail.userId,
            showId: bookingDetail.showId,
            showDate: bookingDetail.showDate,
            seatsCount: bookingDetail.seatsCount,
            seatsBooked: bookingDetail.seatsBooked as unknown as Prisma.InputJsonValue,
            totalPrice: bookingDetail.totalPrice,
            bookingDate: bookingDetail.bookingDate,
            bookingStatus: bookingDetail.bookingStatus as BookingStatus
        }
    })
    return booking ?? null
}


export const createTicket = async (ticketDetails: Ticket) => {
    const ticket = await prisma.ticket.create({
        data: {
            ticketId: ticketDetails.ticketId,
            bookingId: ticketDetails.bookingId,
            seatNumber: ticketDetails.seatNumber,
            seatCategory: ticketDetails.seatCategory,
            price: ticketDetails.price,
            status: ticketDetails.status as TicketStatus
        }
    })
    return ticket ?? null
}

export const fetchTicketById = async (ticketId: string) => {
    const ticket = await prisma.ticket.findUnique({
        where: {
            ticketId: ticketId
        }
    })
    return ticket ?? null;
}

export const fetchBookingById = async (bookingId: string) => {
    const booking = await prisma.booking.findUnique({
        where: {
            id: bookingId
        }
    });
    return booking ?? null;
}

export const fetchTicketsByBookingId = async (bookingId: string) => {
    const tickets = await prisma.ticket.findMany({
        where: {
            bookingId: bookingId
        }
    });
    return tickets ?? null;
}

export const updateMovieStatus = async (status: Status, movieId: number) => {
    const movie = await prisma.movie.update({
        where: {
            id: movieId
        },
        data: {
            status: status
        }
    });

    return movie ?? null;
}

export const fetchBookingWithShowById = async(bookingId: string) => {
    const booking = await prisma.booking.findUnique({
        where: {
            id: bookingId
        },
        include: {
            show: {
                include: {
                    movie: true
                }
            }
        }
    });

    if (!booking) return null;

    const bookingDetails = {
        movieName: booking.show.movie.title,
        time: booking.show.showTime,
        hallNumber: booking.show.screenId,
        date: booking.show.startDate
    };
    return bookingDetails;
}