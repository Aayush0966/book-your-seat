import { confirmBooking, fetchBookingByOrderId } from '@/database/shows/queries';
import { verifyEsewaPayment } from '@/services/esewaService';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken'

interface EsewaData {
    transaction_code: string;
    status: string;
    total_amount: string;
    transaction_uuid: string;
    product_code: string;
    signed_field_names: string;
    signature: string;
}

export const POST = async (request: Request) => {
    const {data} = await request.json();

    const decodedData = JSON.parse(Buffer.from(data, 'base64').toString('utf-8')) as unknown as EsewaData;
    
    const orderId = decodedData.transaction_uuid;
    const amount = decodedData.total_amount;
    
    if ( !orderId || !amount) {
        return NextResponse.json({error: 'Payment failed. please try again later'}, {status: 400})
    }

    const isPaymentValid = await verifyEsewaPayment(orderId, amount);
    if (!isPaymentValid) {
        return NextResponse.json({error: 'Payment failed. please try again later'}, {status: 400})  
    }
    console.log(isPaymentValid.status)

    const booking = await fetchBookingByOrderId(orderId);
    if (!booking) {
        return NextResponse.json({error: 'Booking failed. please try again later'}, {status: 400})  
    }

    const confirmedBooking = await confirmBooking(orderId, isPaymentValid.refId);
    if (!confirmedBooking) {
        return NextResponse.json({error: 'Booking failed. please try again later'}, {status: 400})  
    }

    return NextResponse.json({url:`${process.env.NEXTAUTH_URL}/booking/${booking.id}` }, {status: 201})
}   