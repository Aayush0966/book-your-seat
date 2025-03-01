import { bookShow } from "@/services/showServices";
import { BookingRequest } from "@/types/movie";
import { NextResponse } from "next/server";
import crypto from 'crypto'
import { esewaMethod } from "@/lib/constants";

export async function POST (request: Request)  {
    const bookingDetails: BookingRequest = await request.json();
    if (!bookingDetails) {
        return NextResponse.json({error: "Booking details is required"}, {status: 400});
    }

    const booking = await bookShow(bookingDetails);
    if (booking.error) {
        return NextResponse.json({error: booking.error}, {status: 400});
    }
    const orderId = booking.booked.orderId;
    const hash = crypto.createHash('sha256')
                        .update(`${orderId}${esewaMethod.merchantId}${bookingDetails.totalPrice}${esewaMethod.successUrl}${esewaMethod.secretKey}`)
                        .digest('hex');
            
    const paymentUrl = `${esewaMethod.paymentUrl}?amt=${bookingDetails.totalPrice}&pdc=0&psc=0&txAmt=0&tAmt=${bookingDetails.totalPrice}&pid=${orderId}&scd=${esewaMethod.merchantId}&su=${esewaMethod.successUrl}&fu=${esewaMethod.failureUrl}&hash=${hash}`;   
    return NextResponse.redirect(paymentUrl);
}
