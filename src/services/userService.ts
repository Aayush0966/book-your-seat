import * as userQueries from "@/database/user/queries";
import { sendForgetPasswordCode, sendWelcomeEmail } from "@/lib/nodeMailer";
import { comparePasswords, saltAndHashPassword } from "@/lib/password";
import { SignupDetails } from "@/types/auth";
import { welcomeMailOptions } from "./mailTemplates/welcomeMail";
import { genOTP } from "@/lib/utils";
import { sendCodeMailOptions } from "./mailTemplates/forgetPassMail";


export const handleCreateAccount = async (signupDetails: SignupDetails) => {
    const existingUser = await userQueries.getUserByEmail(signupDetails.email);
    if (existingUser) {
        return { success: false, error: "User already exists" }
    }
    signupDetails.password = await saltAndHashPassword(signupDetails.password)

    const newUser = await userQueries.createAccount(signupDetails);
    if (!newUser) {
        return { success: false, error: "Something went wrong" }
    }
    const emailSent = await sendWelcomeEmail(welcomeMailOptions(newUser.email, newUser.fullName))
    if (!emailSent) {
        return { success: false, error: "Something went wrong" }

    }
    return { success: true, data: newUser }
}

export const handleLogin = async (email: string, password: string) => {
    const existingUser = await userQueries.getUserByEmailWithPassword(email);
    if (!existingUser) {
        return null;
    }
    const isValid = await comparePasswords(password, existingUser.password as string);
    if (!isValid) {
        return null;
    }

    const { password: _, otp: __, otpExpiresAt: ___, ...user } = existingUser;
    return user;
}

export const fetchUserDetails = async (userId: number) => {
    const user = await userQueries.getUserByIdWithBookings(userId);
    return user ?? null;
}

export const sendCode = async (email: string) => {
    const user = await userQueries.getUserByEmail(email)
    if (!user) return {
        success: false,
        error: 'user not found'
    }
    const token = await genOTP();
    const otpCreationTime = Date.now();
    const expiresAt = 10 * 60 * 1000
    const otpExpiresAt = otpCreationTime + expiresAt;
    await userQueries.updateOTP(email, token, otpExpiresAt)
    const sendToken = await sendForgetPasswordCode(sendCodeMailOptions(email, user.fullName, token))
    if (!sendToken) return {
        success: false,
        error: "error sending mail"
    }
    return {
        success: true,
        message: 'OTP sent successfully'
    };
}

export const verifyCode = async (email: string, code: number) => {
    const user = await userQueries.getUserByEmail(email)
    if (!user) return {
        success: false,
        error: 'user not found'
    }
    if (user.otp != code) {
        return {
            success: false,
            error: "OTP is incorrect"
        }
    }
    if (user.otpExpiresAt! < Date.now()) {
        return {
            success: false,
            error: "OTP has been expired"
        }
    }
    return {
        success: true,
        message: "now enter your new password"
    }
}

export const updateNewPassword = async (email: string, password: string, otp: number) => {
    const user = await userQueries.getUserByEmail(email);
    if (!user) {
        return {
            success: false,
            error: 'user not found'
        };
    }
    // if (user.otp !== otp) {
    //     console.log('OTP is incorrect');
    //     return {
    //         success: false,
    //         error: 'OTP is incorrect'
    //     };
    // }
    // if (user.otpExpiresAt! <= Date.now()) {
    //     console.log('OTP has expired');
    //     return {
    //         success: false,
    //         error: 'OTP has expired'
    //     };
    // }
    const hashedPass = await saltAndHashPassword(password);
    const updatedUser = await userQueries.updatePassword(email, hashedPass);
    if (!updatedUser) {
        return {
            success: false,
            error: 'something went wrong'
        };
    }
    return {
        success: true,
        message: 'password changed successfully'
    };
};

// Google OAuth functions
export const handleGoogleSignIn = async (email: string, name: string, googleId: string) => {
    try {
        // Check if account already exists with this Google ID
        const existingAccount = await userQueries.getAccountByProvider("google", googleId);
        
        if (existingAccount) {
            // User already has Google account linked
            return {
                success: true,
                user: existingAccount.user
            };
        }

        // Check if user exists with this email
        const existingUser = await userQueries.getUserByEmail(email);
        
        if (existingUser) {
            // User exists, link Google account
            await userQueries.linkGoogleAccount(existingUser.id, "google", googleId);
            return {
                success: true,
                user: existingUser
            };
        } else {
            // Create new user and link Google account
            const newUser = await userQueries.createGoogleUser(email, name);
            if (!newUser) {
                return {
                    success: false,
                    error: "Failed to create user"
                };
            }
            
            await userQueries.linkGoogleAccount(newUser.id, "google", googleId);
            
            // Send welcome email
            await sendWelcomeEmail(welcomeMailOptions(newUser.email, newUser.fullName));
            
            return {
                success: true,
                user: newUser
            };
        }
    } catch (error) {
        console.error("Google sign-in error:", error);
        return {
            success: false,
            error: "Authentication failed"
        };
    }
};