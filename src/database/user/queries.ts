import prisma from "@/lib/prisma"
import { SignupDetails } from "@/types/auth"

export const getUserByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email
        },
        select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
            contactNumber: true,
            otp: true,
            otpExpiresAt: true,
        }
    })
    if (!user) return null;
    
    return {
        ...user,
        contactNumber: user.contactNumber ? Number(user.contactNumber) : null
    };
}

export const getUserByEmailWithPassword = async (email:string) => {
    const existingUser = await prisma.user.findUnique({
     where: {email}
     })
     if (!existingUser) return null;
     
     return {
         ...existingUser,
         contactNumber: existingUser.contactNumber ? Number(existingUser.contactNumber) : null
     };
}

export const createAccount = async (data: SignupDetails) => {
    const user = await prisma.user.create({
        data: {
            fullName: data.fullName,
            contactNumber: data.contactNumber,
            email: data.email,
            password: data.password
        },
        select: {
            id: true,
            fullName: true,
            email: true,
            contactNumber: true,
        }
    },
     
    )
    return user? user : null;
}


export const getUserByIdWithBookings = async (userId: number) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        include: {
            bookings: {
                include: {
                    show: {
                        include: {
                            movie: true
                        }
                    }
                }
            }
        }
    })
    return user ?? null;
}

export const fetchAllUsers = async () => {
    const users = await prisma.user.findMany({
        where: {
            role: 'USER'
        }
    })
    return users ?? null;
}

export const updateOTP = async (email: string, otp: number, otpExpiresAt: number) => {
    const user = await prisma.user.update({
        where: {
            email
        },
        data: {
            otp: otp,
            otpExpiresAt
        }
    })
    return user;
}

export const updatePassword = async (email: string, password: string) => {
    const user = await prisma.user.update({
        where: {
            email
        },
        data: {
            password
        }
    })
    return user ?? null;
}

// New functions for Google OAuth
export const createGoogleUser = async (email: string, fullName: string) => {
    const user = await prisma.user.create({
        data: {
            fullName,
            email,
            password: null, // Google users don't have passwords
        },
        select: {
            id: true,
            fullName: true,
            email: true,
            contactNumber: true,
            role: true,
        }
    })
    if (!user) return null;
    
    return {
        ...user,
        contactNumber: user.contactNumber ? Number(user.contactNumber) : null
    };
}

export const linkGoogleAccount = async (userId: number, provider: string, providerAccountId: string) => {
    const account = await prisma.account.create({
        data: {
            userId,
            provider,
            providerAccountId,
        }
    })
    return account ?? null;
}

export const getAccountByProvider = async (provider: string, providerAccountId: string) => {
    const account = await prisma.account.findUnique({
        where: {
            provider_providerAccountId: {
                provider,
                providerAccountId,
            }
        },
        include: {
            user: true
        }
    })
    return account ?? null;
}