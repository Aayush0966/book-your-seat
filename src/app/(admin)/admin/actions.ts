"use server"
import * as adminServices from "@/services/adminServices"
import { cookies } from "next/headers";
import { generateAdminToken, setAdminTokenCookie, clearAdminTokenCookie } from "@/lib/adminAuth";
import { getUserByEmail } from "@/database/user/queries";

export const checkUser = async (email: string) => {
    const user = await adminServices.verifyAdmin(email);
    return user ? user : null;
}

export const authenticateOTP = async (email: string, OTP: number) => {
    const isValidOTP = await adminServices.verifyOTP(email, OTP);
    if (!isValidOTP) return null;
    
    // Get the user object after successful OTP verification
    const user = await getUserByEmail(email);
    if (!user) return null;
    
    // Generate JWT token for admin
    const adminToken = generateAdminToken(user.id, user.email, user.role);
    
    // Set the JWT token in cookie
    await setAdminTokenCookie(adminToken);
    
    // Also keep the legacy cookie for compatibility (optional)
    const cookieStore = await cookies();
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
        // Clear both JWT token and legacy cookie
        await clearAdminTokenCookie();
        
        const cookieStore = await cookies();
        cookieStore.delete('loggedIn');
        
        return true;
    } catch (error) {
        console.error('Error during admin logout:', error);
        return false;
    }
}
