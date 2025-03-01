import { bookShow } from "@/services/showServices";
import { BookingRequest } from "@/types/movie";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { esewaMethod } from "@/lib/constants";
import axios from "axios";

export async function POST(request: Request) {
    try {
        const bookingDetails: BookingRequest = await request.json();
        if (!bookingDetails) {
            return NextResponse.json({ error: "Booking details are required" }, { status: 400 });
        }

        // Book the show
        const booking = await bookShow(bookingDetails);
        if (booking.error) {
            return NextResponse.json({ error: booking.error }, { status: 400 });
        }

        const orderId = booking.booked.orderId;
        const productCode = esewaMethod.merchantId; // eSewa requires this as the product_code

        // Generate the data for signing
        const signedData = `total_amount=${bookingDetails.totalPrice},transaction_uuid=${orderId},product_code=${productCode}`;
        
        // Create the HMAC hash signature
        const hash = crypto.createHmac("sha256", esewaMethod.secretKey)
            .update(signedData)
            .digest("base64");

        // Prepare payment request payload
        const paymentData = new URLSearchParams({
            amount: bookingDetails.totalPrice.toString(), // Correct the amount field name to 'amt'
            transaction_uuid: orderId,
            product_code: productCode,
            failure_url: esewaMethod.failureUrl,
            product_delivery_charge: "0",
            product_service_charge: "0",
            signed_field_names: "total_amount,transaction_uuid,product_code", // Signed fields must match exactly
            success_url: esewaMethod.successUrl,
            tax_amount: "0",
            signature: hash,
            total_amount: bookingDetails.totalPrice.toString() // Ensure total_amount is also included
        });
        const paymentResponse = await axios.post(esewaMethod.paymentUrl, paymentData);

        const paymentUrl = paymentResponse.request.res.responseUrl;

        return NextResponse.json({ paymentUrl }, { status: 200 });

    } catch (error: any) {
        console.error("Payment request failed:", error.response?.data || error.message);
        return NextResponse.json({ error: "Payment processing failed", details: error.response?.data }, { status: 500 });
    }
}
