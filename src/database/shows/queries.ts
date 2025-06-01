import { MovieWithShows, MovieDetails, Pricing, Showtime, Status, Price, Booking, Ticket, TicketStatus, SeatWithPrice, Coupon } from "@/types/movie";
import prisma from "@/lib/prisma"; 
import { Prisma, BookingStatus } from "@prisma/client"; // Import the BookingStatus enum
import { generateCouponId } from "@/lib/utils";

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

export const fetchShowsByMovieId = async (movieId: number) => {
    const shows = await prisma.show.findMany({
        where: {
            movieId
        }
    });
    return shows ? shows : null;
}

export const getAllShows = async () => {
    const shows = await prisma.show.findMany();
    return shows ?? null;
}

export const getAllShowsWithMovies = async () => {
    const shows = await prisma.show.findMany({
        include: {
            movie: true,
            screen: true
        }
    });
    return shows ?? null;
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
    const movies = await prisma.movie.findMany({
        where: {
            status: {
                in: ['ACTIVE', 'UPCOMING']
            }
        }
    });
    return movies ? movies : null;
}

export const fetchBookings = async () => {
    const bookings = await prisma.booking.findMany({
        include: {
            user: true,
            show: {
                include: {
                    movie: true
                }
            }
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
            couponId: bookingDetail.couponId,
            orderId: bookingDetail.orderId,
            seatsCount: bookingDetail.seatsCount,
            seatsBooked: bookingDetail.seatsBooked as unknown as Prisma.InputJsonValue,
            totalPrice: bookingDetail.totalPrice,
            bookingDate: bookingDetail.bookingDate,
            paymentMethod: bookingDetail.paymentMethod,
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

export const fetchBookingBySeat = async (seatNumber: string, showTime: number, bookingDate: number) => {
    const bookings = await fetchBookings();
    // Filter out cancelled bookings so their seats become available again
    const activeBookings = bookings.filter((booking) => 
        booking.show.showTime == showTime && 
        booking.bookingDate == bookingDate &&
        booking.bookingStatus !== 'CANCELLED'
    );
    const booking = activeBookings.find((booking) => {
        const seatsBooked: SeatWithPrice[] = booking?.seatsBooked as unknown as SeatWithPrice[];
        return seatsBooked.find((seat) => seat.seat == seatNumber);
    });
    console.debug("Booking found:", booking);
    return booking ?? null;
}

export const fetchBookingByOrderId = async (orderId: string) => {
    const booking = await prisma.booking.findFirst({
        where: {
            orderId
        }
    })
    return booking ?? null;
}

export const confirmBooking = async (orderId:string, refId: string) => {
    const booking = await prisma.booking.update({
        where: {
            orderId
        },
        data : {
            paymentRef: refId,
            bookingStatus: "CONFIRMED"
        }
    })
    
    await prisma.ticket.updateMany({
        where: {
            bookingId: booking.id
        },
        data: {
            status: "VALID"
        }
    })
    return booking ?? null;
}

export const fetchCouponByCode = async (code: string) => {
    const coupon = await prisma.coupon.findFirst({
        where: {
            code: code
        }
    })
    return coupon ?? null;
}

export const fetchCoupons = async () => {
    const coupons = await prisma.coupon.findMany();
    
    return coupons ?? null
}

export const createCoupon = async (coupon: Coupon) => {    
    const newCoupon = await prisma.coupon.create({
        data: {
            id: generateCouponId(),
            code: coupon.code,
            discount: coupon.discount,
            expiryDate: Math.floor(new Date(coupon.expiryDate).getTime() / 1000), 
            isActive: coupon.isActive,
            usageCount: 0
        }
    })
    return newCoupon ?? null;
}

export const toggleCouponStatus = async (couponId: string, isActive: boolean) => {
    const coupon = await prisma.coupon.update({
        where: {
            id: couponId
        },
        data:{
            isActive: isActive
        }
    })
    return coupon ?? null
}

export const updateCouponUseCount = async(couponId: string) => {
    await prisma.coupon.update({
        where: {
            id: couponId
        },
        data: {
            usageCount: {
                increment: 1
            }
        }
    })
}

export const cancelExpiredPendingBookings = async () => {
    try {
        // Calculate 30 minutes ago timestamp
        const thirtyMinutesAgo = Math.floor((Date.now() - 30 * 60 * 1000) / 1000);
        
        // Find all pending bookings older than 30 minutes
        const expiredBookings = await prisma.booking.findMany({
            where: {
                bookingStatus: 'PENDING',
                bookingDate: {
                    lt: thirtyMinutesAgo
                }
            }
        });

        if (expiredBookings.length === 0) {
            return { cancelledCount: 0, bookingIds: [] };
        }

        // Get booking IDs for batch operations
        const expiredBookingIds = expiredBookings.map(booking => booking.id);

        // Update bookings to CANCELLED status
        await prisma.booking.updateMany({
            where: {
                id: {
                    in: expiredBookingIds
                }
            },
            data: {
                bookingStatus: 'CANCELLED'
            }
        });

        // Update associated tickets to CANCELLED status
        await prisma.ticket.updateMany({
            where: {
                bookingId: {
                    in: expiredBookingIds
                }
            },
            data: {
                status: 'CANCELLED'
            }
        });

        console.log(`Cancelled ${expiredBookings.length} expired pending bookings:`, expiredBookingIds);
        
        return { 
            cancelledCount: expiredBookings.length, 
            bookingIds: expiredBookingIds 
        };
    } catch (error) {
        console.error('Error cancelling expired bookings:', error);
        throw error;
    }
}