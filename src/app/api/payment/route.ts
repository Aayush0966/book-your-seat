import { confirmBooking, fetchBookingByOrderId } from '@/database/shows/queries';
import { verifyEsewaPayment } from '@/services/esewaService';
import { verifyKhaltiPayment } from '@/services/khaltiService';
import { NextResponse } from 'next/server';

interface ValidPayment {
    success: boolean;
    data?: {
        product_code: string;
        transaction_uuid: string;
        total_amount: number;
        status: string;
        ref_id: string;
        pidx: string;
        transaction_id: string;
    };
    message?: string;
    orderId?: string;
}

export const POST = async (request: Request) => {
    const { data, paymentMethod }: { data: any; paymentMethod: string } = await request.json();

    let validPayment: ValidPayment;

    if (paymentMethod === "ESEWA") {
        validPayment = await verifyEsewaPayment(data);
        if (!validPayment.success) {
            return NextResponse.json({error: validPayment.message}, {status: 400});
        }
    } else if (paymentMethod === "KHALTI") {
        validPayment = await verifyKhaltiPayment(data.pidx);
        if (!validPayment.success) {
            return NextResponse.json({error: validPayment.message}, {status: 400});
        }
        if (validPayment.success && !(validPayment.data.status == 'Completed')) {
            return NextResponse.json({error: "Payment failed. please try again later."}, {status: 500});
        }
    }

    const transactionId = paymentMethod === "ESEWA" ? validPayment.data?.transaction_uuid : data.purchaseOrderId;
    const refId = paymentMethod === "ESEWA" ? validPayment.data?.ref_id : data.pidx;

    const booking = await fetchBookingByOrderId(transactionId);
    if (!booking) {
        return NextResponse.json({error: 'Booking failed. please try again later'}, {status: 400});
    }

    const confirmedBooking = await confirmBooking(transactionId, refId);
    if (!confirmedBooking) {
        return NextResponse.json({error: 'Booking failed. please try again later'}, {status: 400});
    }

    return NextResponse.json({url: `${process.env.NEXTAUTH_URL}/booking/${booking.id}`}, {status: 201});
}
