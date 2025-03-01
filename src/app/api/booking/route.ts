import { bookShow } from "@/services/showServices";
import { BookingRequest } from "@/types/movie";
import { NextResponse } from "next/server";
import { getPaymentUrl } from "@/services/esewaService";

export async function POST(request: Request) {
    try {
        const bookingDetails: BookingRequest = await request.json();
        if (!bookingDetails) {
            return NextResponse.json({ error: "Booking details are required" }, { status: 400 });
        }
        const booking = await bookShow(bookingDetails);
        if (booking.error) {
            return NextResponse.json({ error: booking.error }, { status: 400 });
        }

        if (bookingDetails.paymentMethod === 'ESEWA') {
            const paymentUrl = await getPaymentUrl(bookingDetails, booking.booked.orderId)
            if (!paymentUrl.success) {
                return NextResponse.json({error: paymentUrl.message}, {status: 400})
            }
            return NextResponse.json({ paymentUrl: paymentUrl.url }, { status: 200 });
        }

    } catch (error: any) {
        console.error("Payment request failed:", error.response?.data || error.message);
        return NextResponse.json({ error: "Payment processing failed", details: error.response?.data }, { status: 500 });
    }
}
