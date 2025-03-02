import { confirmBooking, fetchBookingByOrderId } from '@/database/shows/queries';
import { verifyEsewaPayment } from '@/services/esewaService';
import { NextResponse } from 'next/server';

interface ValidPayment {
    success: boolean;
    data: {
        product_code: string;
        transaction_uuid: string;
        total_amount: number;
        status: string;
        ref_id: string;
    };
    orderId: string;
}

export const POST = async (request: Request) => {
    const {data, paymentMethod} = await request.json();

    let validPayment: ValidPayment;

    if (paymentMethod === "ESEWA") {
        const validPayment = await verifyEsewaPayment(data);
        if (!validPayment.success) {
            return NextResponse.json({error:validPayment.message}, {status: 400})  
        }
    }

    const booking = await fetchBookingByOrderId(validPayment.data.transaction_uuid);
    if (!booking) {
        return NextResponse.json({error: 'Booking failed. please try again later'}, {status: 400})  
    }

    const confirmedBooking = await confirmBooking(validPayment.data.transaction_uuid, validPayment.data.ref_id);
    if (!confirmedBooking) {
        return NextResponse.json({error: 'Booking failed. please try again later'}, {status: 400})  
    }

    return NextResponse.json({url:`${process.env.NEXTAUTH_URL}/booking/${booking.id}` }, {status: 201})
}   