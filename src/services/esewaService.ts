import axios from "axios";
import { esewaMethod } from "@/lib/constants";

export async function verifyEsewaPayment(transaction_uuid: string, amount: string) {
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
