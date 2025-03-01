import { confirmBooking, fetchBookingByOrderId } from '@/database/shows/queries';
import { verifyEsewaPayment } from '@/services/esewaService';
import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
    const { searchParams } = new URL(request.url);
    const paymentStatus = searchParams.get('p');
    const orderId = searchParams.get('oid');
    const amount = searchParams.get('amt');
    const refId = searchParams.get('refId');
    
    if (paymentStatus == "failure" || !orderId || !amount || !refId) {
        return NextResponse.json({error: 'Payment failed. please try again later'}, {status: 400})
    }

    const isPaymentValid = await verifyEsewaPayment(orderId, amount, refId);
    if (!isPaymentValid) {
        return NextResponse.json({error: 'Payment failed. please try again later'}, {status: 400})  
    }

    const booking = await fetchBookingByOrderId(orderId);
    if (!booking) {
        return NextResponse.json({error: 'Booking failed. please try again later'}, {status: 400})  
    }

    const confirmedBooking = await confirmBooking(orderId, refId);
    if (!confirmedBooking) {
        return NextResponse.json({error: 'Booking failed. please try again later'}, {status: 400})  
    }

    return NextResponse.json({
        message: "Payment successfull",
        bookingId: booking.id
    })

    
}