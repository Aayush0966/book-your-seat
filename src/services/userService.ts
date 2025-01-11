import * as userQueries from "@/database/user/queries";

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