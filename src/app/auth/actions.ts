'use server'

import { signIn, signOut } from "@/auth";
import { CredentialsType } from "@/types/auth";

export const verifyUser = async (credentials: CredentialsType) => {
    try {
        const user = await signIn("credentials", credentials)
        if (!user) return null;
        return user;
    } catch (error) {
        console.error("Error while verifying user: ", error)
        return null
    }
}

export const logoutUser = async () => {
    await signOut();
}