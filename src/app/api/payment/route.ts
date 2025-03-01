import { confirmBooking, fetchBookingByOrderId } from '@/database/shows/queries';
import { verifyEsewaPayment } from '@/services/esewaService';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
    const {data} = await request.json();

    const isPaymentValid = await verifyEsewaPayment(data);
    if (!isPaymentValid.success) {
        return NextResponse.json({error:isPaymentValid.message}, {status: 400})  
    }

    const booking = await fetchBookingByOrderId(isPaymentValid.orderId);
    if (!booking) {
        return NextResponse.json({error: 'Booking failed. please try again later'}, {status: 400})  
    }

    const confirmedBooking = await confirmBooking(isPaymentValid.orderId, isPaymentValid.data.refId);
    if (!confirmedBooking) {
        return NextResponse.json({error: 'Booking failed. please try again later'}, {status: 400})  
    }

    return NextResponse.json({url:`${process.env.NEXTAUTH_URL}/booking/${booking.id}` }, {status: 201})
}   