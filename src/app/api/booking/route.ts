import { bookShow } from "@/services/showServices";
import { BookingRequest } from "@/types/movie";
import { NextResponse } from "next/server";


export async function POST (request: Request)  {
    const bookingDetails: BookingRequest = await request.json()
    if (!bookingDetails) {
        return NextResponse.json({error: "Booking details is required"}, {status: 400})
    }
    console.log(bookingDetails)
    const booking = await bookShow(bookingDetails);
    if (!booking) {
        return NextResponse.json({error: "Something went wrong"}, {status: 500})
    }
    return NextResponse.json({bookingId: booking.booking.id}, {status: 201})
}