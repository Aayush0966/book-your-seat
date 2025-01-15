import * as userQueries from "@/database/user/queries";
import { comparePasswords, saltAndHashPassword } from "@/lib/password";
import { SignupDetails } from "@/types/auth";


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
    if (!existingUser) return null;
    const isValid = await comparePasswords(password, existingUser.password as string);
    if (!isValid) return null;

    const { password: _, otp: __, otpExpiresAt: ___, ...user } = existingUser;
    return user;
}