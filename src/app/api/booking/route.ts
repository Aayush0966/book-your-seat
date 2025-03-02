import { bookShow } from "@/services/showServices";
import { BookingRequest } from "@/types/movie";
import { NextResponse } from "next/server";
import { getPaymentUrl } from "@/services/esewaService";
import { getKhaltiPaymentUrl } from "@/services/khaltiService";

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
        else if (bookingDetails.paymentMethod === 'KHALTI') {
            const response = await getKhaltiPaymentUrl(bookingDetails, booking.booked.orderId);
            if (!response.success) {
                return NextResponse.json({error: response.error}, {status: 500})
            }
            return NextResponse.json({paymentUrl: response.data.payment_url})
        }
    } catch (error: any) {
        console.error("Payment request failed:", error.response?.data || error.message);
        return NextResponse.json({ error: "Payment processing failed", details: error.response?.data }, { status: 500 });
    }
}
