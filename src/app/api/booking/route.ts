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

        if (!bookingDetails.showId || !bookingDetails.seatsBooked || !bookingDetails.selectedTime || 
            !bookingDetails.showDate || !bookingDetails.bookingDate || !bookingDetails.totalPrice || 
            !bookingDetails.paymentMethod) {
            return NextResponse.json({ error: "Missing required booking fields" }, { status: 400 });
        }

        if (!Array.isArray(bookingDetails.seatsBooked) || bookingDetails.seatsBooked.length === 0) {
            return NextResponse.json({ error: "At least one seat must be selected" }, { status: 400 });
        }

        for (const seat of bookingDetails.seatsBooked) {
            if (!seat.seat || !seat.price || seat.price <= 0) {
                return NextResponse.json({ error: "Invalid seat information" }, { status: 400 });
            }
        }

        if (!['ESEWA', 'KHALTI'].includes(bookingDetails.paymentMethod)) {
            return NextResponse.json({ error: "Invalid payment method" }, { status: 400 });
        }

        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (bookingDetails.showDate < currentTimestamp) {
            return NextResponse.json({ error: "Cannot book shows in the past" }, { status: 400 });
        }

        const calculatedTotal = bookingDetails.seatsBooked.reduce((total, seat) => total + seat.price, 0);
        if (Math.abs(calculatedTotal - bookingDetails.totalPrice) > 0.01) {
            return NextResponse.json({ error: "Total price mismatch" }, { status: 400 });
        }

        if (bookingDetails.couponCode && bookingDetails.couponCode.trim().length > 0) {
            const couponCode = bookingDetails.couponCode.trim();
            if (couponCode.length < 3 || couponCode.length > 20) {
                return NextResponse.json({ error: "Invalid coupon code format" }, { status: 400 });
            }
        }

        const booking = await bookShow(bookingDetails);
        
        if (booking.error) {
            return NextResponse.json({ error: booking.error }, { status: 400 });
        }

        if (!booking.success || !booking.booked) {
            return NextResponse.json({ error: "Booking failed" }, { status: 500 });
        }

        if (bookingDetails.paymentMethod === 'ESEWA') {
            const paymentUrl = await getPaymentUrl(bookingDetails, booking.booked.orderId);
            if (!paymentUrl.success) {
                return NextResponse.json({ 
                    error: "ESEWA payment service is currently unavailable. Please try using KHALTI or try again later.",
                    paymentError: true,
                    suggestedAction: "Try KHALTI payment method"
                }, { status: 503 });
            }
            return NextResponse.json({ paymentUrl: paymentUrl.url }, { status: 200 });
        }
        else if (bookingDetails.paymentMethod === 'KHALTI') {
            const response = await getKhaltiPaymentUrl(bookingDetails, booking.booked.orderId);
            if (!response.success) {
                return NextResponse.json({ 
                    error: "KHALTI payment service is currently unavailable. Please try using ESEWA or try again later.",
                    paymentError: true,
                    suggestedAction: "Try ESEWA payment method"
                }, { status: 503 });
            }
            return NextResponse.json({ paymentUrl: response.data.payment_url }, { status: 200 });
        }

        return NextResponse.json({ error: "Invalid payment method" }, { status: 400 });

    } catch (error: any) {
        console.error("Payment request failed:", error.response?.data || error.message);
        
        if (error.name === 'ValidationError') {
            return NextResponse.json({ error: "Invalid booking data", details: error.message }, { status: 400 });
        }
        
        if (error.code === 'P2002') {
            return NextResponse.json({ error: "Duplicate booking detected" }, { status: 409 });
        }

        // Handle payment provider specific errors
        if (error.message?.includes('ESEWA') || error.message?.includes('esewa')) {
            return NextResponse.json({ 
                error: "ESEWA payment service is currently unavailable. Please try using KHALTI or try again later.",
                paymentError: true,
                suggestedAction: "Try KHALTI payment method"
            }, { status: 503 });
        }

        if (error.message?.includes('KHALTI') || error.message?.includes('khalti')) {
            return NextResponse.json({ 
                error: "KHALTI payment service is currently unavailable. Please try using ESEWA or try again later.",
                paymentError: true,
                suggestedAction: "Try ESEWA payment method"
            }, { status: 503 });
        }

        // Handle network/timeout errors
        if (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT' || error.code === 'ENOTFOUND') {
            return NextResponse.json({ 
                error: "Payment service is temporarily unavailable. Please try another payment method or try again later.",
                paymentError: true,
                suggestedAction: "Try again in a few minutes or use another payment method"
            }, { status: 503 });
        }

        return NextResponse.json({ 
            error: "Payment processing failed", 
            details: process.env.NODE_ENV === 'development' ? error.message : undefined 
        }, { status: 500 });
    }
}
