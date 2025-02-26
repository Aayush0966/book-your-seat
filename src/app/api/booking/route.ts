import { bookShow } from "@/services/showServices";
import { BookingRequest } from "@/types/movie";
import { NextResponse } from "next/server";


export async function POST (request: Request)  {
    const bookingDetails: BookingRequest = await request.json()
    if (!bookingDetails) {
        return NextResponse.json({error: "Booking details is required"}, {status: 400})
    }
    const booking = await bookShow(bookingDetails);
    if (!booking.success) {
        return NextResponse.json({error: booking.error}, {status: 400})
    }
    return NextResponse.json({message: booking.message, bookingId: booking.booked?.id}, {status: 201})
}