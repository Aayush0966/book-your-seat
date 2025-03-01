import axios from "axios";
import { esewaMethod } from "@/lib/constants";

export async function verifyEsewaPayment(orderId: string, amount: string, refId: string) {
    try {
        const response = await axios.post(
            esewaMethod.verifyUrl,
            new URLSearchParams({
                amt: amount,
                scd: esewaMethod.merchantId,
                pid: orderId,
                rid: refId
            }).toString()
        );
        console.log(response)

        return response.data.includes("<response_code>Success</response_code>");
    } catch (error) {
        console.error("Esewa verification failed:", error);
        return false;
    }
}
