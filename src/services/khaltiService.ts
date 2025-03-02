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
            'Authorization': 'key 429a0a6ba0104c4eb32d77b13eae669a',
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