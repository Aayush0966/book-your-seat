import {Booking, BookingRequest, MovieDetails, SeatWithPrice, Showtime, Status, Ticket, TicketDetails, Price, BookingDetails } from "@/types/movie";
import * as showQueries from "@/database/shows/queries"
import { auth } from "@/auth";
import { generateBookingId, generateTicketId } from "@/lib/utils";


export const addMovieAndShow = async (movieDetails: MovieDetails) => {
    try {
        if (!movieDetails) {
            throw new Error('Movie details are required');
        }

        const newMovie = await showQueries.createMovie(movieDetails);

        if (!movieDetails.showtimes || movieDetails.showtimes.length === 0) {
            throw new Error('At least one showtime is required');
        }

        const newShows = await Promise.all(
            movieDetails.showtimes.map(async (showtime: Showtime) => {
                if (!showtime.screenId || !showtime.showTime) {
                    throw new Error('Invalid showtime data');
                }

                const newShow = await showQueries.createShow(
                    newMovie.id,
                    movieDetails.pricing,
                    showtime,
                    movieDetails.showStartDate,
                    movieDetails.showEndDate
                );
                return newShow;
            })
        );

        console.log('New movie created:', newMovie);
        return newMovie;
    } catch (error) {
        throw error;
    }
};

// export const fetchShows = async (status: Status) => {
//     try {
//         const shows = await showQueries.fetchShows(status);
//         if (!shows) return null;

//         const movieIds = [...new Set(shows.map((show) => show.movieId))];
//         const movies = await Promise.all(
//             movieIds.map(async (movieId) => await showQueries.fetchMoviesById(movieId))
//         );
//         if (!movies) return null;

//         const moviesWithShows = movies.map((movie) => {
//             const movieShows = shows.filter((show) => show.movieId === movie?.id);
//             return {
//             ...movie,
//             shows: movieShows,
//             };
//         });
//         return moviesWithShows;
//     } catch (error) {
//         console.error('Error fetching shows:', error);
//         throw error;
//     }
// };


export const fetchShowsByMovieId = async (movieId: number) => {
    try {
        const movie = await showQueries.fetchMovieWithShowsById(movieId)
        if (!movie) return null;
        return movie
    } catch (error) {
        console.log("Something went wrong: ", error)
    }
}



export const fetchMovies = async (status: Status) => {
    try {
        const movies = await showQueries.fetchMoviesByStatus(status);
        if (!movies) return null;
        
        const currentTimestamp = Math.floor(Date.now() / 1000);
        
        const moviesWithShows = await Promise.all(
            movies.map(async (movie) => {
                const movieWithShows = await showQueries.fetchMovieWithShowsById(movie.id!);
                return movieWithShows;
            })
        );
        
        const filteredMovies = moviesWithShows.filter(movie => {
            return movie?.shows.some(show => show.endDate > currentTimestamp);
        });
        return filteredMovies;
    } catch (error) {
        console.error('Error fetching movies with shows:', error);
        throw error;
    }
};

export const bookShow = async (bookingDetails: BookingRequest) => {
    const session = await auth();
    const seatsCount = bookingDetails.seatsBooked.length;
    console.log('Checking if seats are already booked...');
    const booked = await Promise.all(
        bookingDetails.seatsBooked.map(async (seat) => {
            const booking = await showQueries.fetchBookingBySeat(seat.seat, bookingDetails.selectedTime, bookingDetails.bookingDate);
            console.log(`Seat ${seat.seat} booked status: ${!!booking}`);
            if (booking) return true;
            return false;
        })
    );
    console.log('Booked seats status:', booked);

    if (booked.includes(true)) {
        return {
            success: false,
            error: 'The seat has been booked already'
        };
    }

    const coupon = await showQueries.fetchCouponByCode(bookingDetails.couponCode);
    
    await showQueries.updateCouponUseCount(coupon.id)

    const bookingDetail: Booking = {
        id: generateBookingId(),
        userId: session?.user?.id ? parseInt(session.user.id) : 0,
        showId: bookingDetails.showId,
        showDate: bookingDetails.showDate,
        seatsCount,
        orderId: (Date.now() / 1000).toLocaleString(),
        seatsBooked: bookingDetails.seatsBooked,
        totalPrice: bookingDetails.totalPrice,
        couponId: coupon.id,
        bookingDate: bookingDetails.bookingDate,
        bookingStatus: "PENDING",
        paymentMethod: bookingDetails.paymentMethod
    };

    const newBooking = await showQueries.createBooking(bookingDetail);

    if (newBooking) {
        await Promise.all(
            bookingDetails.seatsBooked.map(async (seatInfo) => {
                const [category, number] = seatInfo.seat.split('/');
                const ticketDetails: Ticket = {
                    ticketId: generateTicketId(),
                    bookingId: newBooking.id,
                    seatNumber: number,
                    seatCategory: category,
                    price: seatInfo.price,
                    status: "PENDING"
                };
                return await showQueries.createTicket(ticketDetails);
            })
        );

        return { success: true, message: "Booked successfully", booked: newBooking };
    }

    return {
        success: false,
        error: 'Something went wrong. Please try again later.'
    };
}

export const fetchBookingDetails = async (bookingId: string): Promise<BookingDetails | null> => {
    const booking = await showQueries.fetchBookingById(bookingId);
    if (!booking) return null;

    const showDetails = await showQueries.fetchBookingWithShowById(booking.id);
    if (!showDetails) return null;

    const tickets = await showQueries.fetchTicketsByBookingId(bookingId);
    if (!tickets) return null;

    return {
        ...booking,
        seatsBooked: booking.seatsBooked as unknown as SeatWithPrice[],
        movieName: showDetails.movieName!,
        time: showDetails.time,
        hallNumber: showDetails.hallNumber,
        tickets
    };
}

export const fetchShowDetailsByTicketId = async (ticketId: string) => {
    const ticket = await showQueries.fetchTicketById(ticketId);
    if (!ticket) return null;
    const booking = await showQueries.fetchBookingWithShowById(ticket.bookingId);
    if (!booking) return null;

    const ticketDetails: TicketDetails = {
        ...ticket,
        movieName: booking.movieName!,
        date: booking.date,
        time: booking.time,
        hallNumber: booking.hallNumber,
        seats: [
            {
                seat: ticket.seatNumber,
                price: ticket.price
            }
        ]
    }
    return ticketDetails;
}

export const validateCoupon = async (couponCode: string) => {
    const coupon = await showQueries.fetchCouponByCode(couponCode);
    if (!coupon) {
        return {
            success: false,
            error: "Coupon not found"
        }
    }
    if (coupon.expiryDate < (Date.now() / 1000) || !(coupon.isActive)) {
        return {
            success: false,
            error: "Coupon has expired"
        }
    }
    return {
        success: true,
        discount: coupon.discount
    }
}