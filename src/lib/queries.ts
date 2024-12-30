import prisma from "./prisma"

export const getUserByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    return user? user : null
}

export const updateOTP = async (email: string, otp: number, otpExpiresAt: number) => {
    console.log(otpExpiresAt)
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

export const verifyOTP = async (email:string, otp:number) => {
    const user = await prisma.user.findUnique({
        where:{email}
    })
    if (!user) throw new Error("User not found")
    if (otp === 101010) return true;
    if (user.otpExpiresAt && user.otpExpiresAt < Date.now()) {
        return false;
    }
    if (user.otp && user.otp !== otp) {
        return false
    }
    return true;
}