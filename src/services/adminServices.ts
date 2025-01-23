import { updateOTP } from "@/database/admin/queries";
import * as userQueries from "@/database/user/queries"
import { sendOTP } from "@/lib/nodeMailer";
import { genOTP } from "@/lib/utils";

export const verifyAdmin = async (email: string) => {
    const admin = await userQueries.getUserByEmail(email);
    if (!admin) return null;
    const otp = await genOTP();
    const otpCreationTime = Date.now();
    const expiresAt =  10 * 60 * 1000
    const otpExpiresAt = otpCreationTime + expiresAt;
    await updateOTP(email, otp, otpExpiresAt)
    await sendOTP(email, otp);
    return admin;
}

export const verifyOTP = async (email:string, otp:number) => {
    const user = await userQueries.getUserByEmail(email);
    if (!user) throw new Error("User not found")
    if (otp === 101010) return true; //default pin. Remove for production
    if (user.otpExpiresAt && user.otpExpiresAt < Date.now()) {
        return false;
    }
    if (user.otp && user.otp !== otp) {
        return false
    }
    return true;
}

