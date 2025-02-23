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
            contactNumber: true,
            otp: true,
            otpExpiresAt: true,
        }
    })
    return user ? user : null
}

export const getUserByEmailWithPassword = async (email:string) => {
    const existingUser = await prisma.user.findUnique({
     where: {email}
     })
     return existingUser ? existingUser : null
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