"use server"
import * as adminServices from "@/services/adminServices"
import { cookies } from "next/headers";

export const checkUser = async (email: string) => {
    const user = await adminServices.verifyAdmin(email);
    return user ? user : null;
}

export const authenticateOTP = async (email:string, OTP:number) => {
    const user = await  adminServices.verifyOTP(email, OTP);
    if (!user) return null;
    const cookieStore = await cookies()
    const oneDay = 24 * 60 * 60 * 1000;
    cookieStore.set('loggedIn', 'true', { 
        httpOnly: true,
        secure: true,
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
        return false
    }
}
