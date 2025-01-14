import * as userQueries from "@/database/user/queries";
import { comparePasswords, saltAndHashPassword } from "@/lib/password";
import { SignupDetails } from "@/types/auth";

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

export const handleCreateAccount = async (signupDetails: SignupDetails) => {
    const existingUser = await userQueries.getUserByEmail(signupDetails.email);
    if (existingUser) {
        return {success: false, error: "User already exists"}
    }
    signupDetails.password = await saltAndHashPassword(signupDetails.password)

    const newUser = await userQueries.createAccount(signupDetails);
    if (!newUser) {
        return {success: false, error: "Something went wrong"}
    }
    return {success: true, data: newUser}
}
export const handleLogin = async (email: string, password: string) => {
    const existingUser = await userQueries.getUserByEmailWithPassword(email);
    console.log(existingUser)
    if (!existingUser) return null;
    const isValid = await comparePasswords(password, existingUser.password as string);
    if (!isValid) return null;

    const { password: _, otp: __, otpExpiresAt: ___, ...user } = existingUser;
    return user;
}