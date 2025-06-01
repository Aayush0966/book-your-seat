'use server'

import { signIn, signOut } from "@/auth";
import { CredentialsType } from "@/types/auth";
import { AuthError } from "next-auth";

export const verifyUser = async (credentials: CredentialsType) => {
  try {
      await signIn("credentials", {
      ...credentials,
      redirect: true,
      redirectTo: "/home",
      callbackUrl: "/home",
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
    throw error;
  }
}

export const signInWithGoogle = async () => {
  try {
    await signIn("google", {
      redirect: true,
      redirectTo: "/home",
      callbackUrl: "/home",
    });
  } catch (error) {
    throw error;
  }
}

export const logoutUser = async () => {
    await signOut();
}