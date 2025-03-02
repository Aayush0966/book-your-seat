import { khaltiMethod } from "@/lib/constants"
import { BookingRequest } from "@/types/movie"
import axios from "axios"

export const getKhaltiPaymentUrl = async (bookingDetails: BookingRequest, orderId: string) => {
    const payloadData = {
        return_url: khaltiMethod.successUrl,
        website_url: process.env.NEXTAUTH_URL,
        amount: (bookingDetails.totalPrice * 100),
        purchase_order_id: orderId,
        purchase_order_name: 'movie tickets',
    }
    console.log(payloadData)

    const response = await axios.post(khaltiMethod.paymentUrl, payloadData, {
        headers: {
            "Authorization": `key ${process.env.KHALTI_LIVE_SECRET_KEY}`
        }
    })
    console.log(response.data)
    if (response.status == 200) {
        return {
            success: true,
            data: response.data
        }
    }
    else {
        return {
            success: false,
            error: "payment failed. please try again later"
        }
    }
}

export const verifyKhaltiPayment = async (data: string) => {
    const response = await axios.post(khaltiMethod.verifyUrl, {pidx: data}, {
        headers: {
            "Authorization": `key ${process.env.KHALTI_LIVE_SECRET_KEY}`
        }
    })
    console.log(response.data)

    if (response.status == 200) {
        return {
            success: true,
            data: response.data
        }
    }
    else {
        return {
            success: false,
            message: "Error: while verifying payment"
        }
    }

}