import { Role } from "@prisma/client";
import { Booking } from "./movie";


export type UserType = {
    id: number;
    fullName: string;
    email: string;
    role?: Role;
    contactNumber: bigint | null
    otp?: number | null;
    otpExpiresAt?: bigint | null;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface userDetails extends UserType {
    bookings: Booking[];
}