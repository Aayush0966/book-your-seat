import axios from "axios";
import { esewaMethod } from "@/lib/constants";
import { BookingRequest } from "@/types/movie";
import crypto from 'crypto'

interface EsewaData {
    transaction_code: string;
    status: string;
    total_amount: string;
    transaction_uuid: string;
    product_code: string;
    signed_field_names: string;
    signature: string;
}

export async function verifyTransaction(transaction_uuid: string, amount: string) {
    try {
        const response = await axios.get(
            esewaMethod.verifyUrl,
            {
                params: {
                    transaction_uuid,
                    total_amount: amount,
                    product_code: esewaMethod.merchantId
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error("Esewa verification failed:", error);
        return false;
    }
}


export const verifyEsewaPayment = async (data) => {
    const decodedData = JSON.parse(Buffer.from(data, 'base64').toString('utf-8')) as unknown as EsewaData;

    const orderId = decodedData.transaction_uuid;
    const amount = decodedData.total_amount;

    if (!orderId || !amount) {
        return {
            success: false,
            message: "Payment failed: OrderId or amount was not provided"
        }
    }
    const paymentValid = await verifyTransaction(orderId, amount);

    if (!paymentValid) {
        return {
            success: false,
            message: "Payment failed: invald payment"
        }
    }

    return {
        success: true,
        data: paymentValid,
        orderId
    };
    
}

export const getPaymentUrl = async (bookingDetails: BookingRequest, orderId: string) => {
    try {
        const productCode = esewaMethod.merchantId;
        const signedData = `total_amount=${bookingDetails.totalPrice},transaction_uuid=${orderId},product_code=${productCode}`;

        const signature = crypto.createHmac("sha256", esewaMethod.secretKey)
            .update(signedData)
            .digest("base64");

        const paymentPayload = new URLSearchParams({
            amount: bookingDetails.totalPrice.toString(),
            transaction_uuid: orderId.toString(),
            product_code: productCode,
            failure_url: esewaMethod.failureUrl,
            product_delivery_charge: "0",
            product_service_charge: "0",
            signed_field_names: "total_amount,transaction_uuid,product_code",
            success_url: esewaMethod.successUrl,
            tax_amount: "0",
            signature,
            total_amount: bookingDetails.totalPrice.toString()
        });

        const paymentResponse = await axios.post(esewaMethod.paymentUrl, paymentPayload);

        if (!paymentResponse || !paymentResponse.request || !paymentResponse.request.res || !paymentResponse.request.res.responseUrl) {
            return {
                success: false,
                message: "Failed to retrieve payment URL. Please try again later."
            };
        }

        const paymentUrl = paymentResponse.request.res.responseUrl;

        return {
            success: true,
            url: paymentUrl
        };
    } catch (error) {
        return {
            success: false,
            message: "An error occurred while generating the payment URL. Please try again later."
        };
    }
};