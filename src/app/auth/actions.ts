'use server'

import { signIn, signOut } from "@/auth";
import { CredentialsType } from "@/types/auth";
import { AuthError } from "next-auth";

export const verifyUser = async (credentials: CredentialsType) => {
  try {
      const result = await signIn("credentials", {
      ...credentials,
      redirect: false,
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials.' };
        default:
          return { error: 'Something went wrong.' };
      }
    }
    return { error: 'Something went wrong.' };
  }
}

export const logoutUser = async () => {
    await signOut();
}