'use server'
import { getUserByEmail, updateOTP, verifyOTP } from "@/database/queries";
import { sendOTP } from "@/lib/nodeMailer";
import { cookies } from "next/headers";

export const checkUser = async (email: string) => {
    const user = await getUserByEmail(email)
    if (!user) return null;
    const otp = await genOTP();
    const otpCreationTime = Date.now();
    const expiresAt =  10 * 60 * 1000
    const otpExpiresAt = otpCreationTime + expiresAt;
    await updateOTP(email, otp, otpExpiresAt)
    await sendOTP(email, otp)
    return user
}

export const authenticateOTP = async (email:string, OTP:number) => {
    const user = await verifyOTP(email, OTP);
    if (!user) return null;
    const cookieStore = await cookies()
    const oneDay = 24 * 60 * 60 * 1000;
    cookieStore.set('loggedIn', 'true', { 
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: new Date(Date.now() + oneDay)
    });
    return user;
}

export const logOutAdmin = async () => {
    try {
        const cookieStore = await cookies();
        cookieStore.delete('loggedIn');
        return true
    } catch (error) {
        console.log('Failed to logout: ', error)
        return false
    }
}

export const genOTP = async () => {
    const numbers = '123456789'
    let otp = '';
    for (let i =0; i <= 5; i++) {
        otp += numbers.charAt(Math.floor(Math.random() * numbers.length))
    }
    return parseInt(otp);
}

