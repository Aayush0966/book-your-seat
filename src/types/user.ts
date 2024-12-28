import { Role } from "@prisma/client";


export type UserType = {
    id: number;
    fullName: string;
    email: string;
    password: string;
    role: Role;
    contactNumber: number;
    otp: number | null;
    otpExpiresAt: number | null;
    createdAt: Date;
    updatedAt: Date;
}