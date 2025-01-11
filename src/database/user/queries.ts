import prisma from "@/lib/prisma"

export const getUserByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    return user? user : null
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

