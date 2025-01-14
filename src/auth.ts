import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth, { CredentialsSignin } from "next-auth";
import Google from "next-auth/providers/google";
import prisma from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import { handleLogin } from './services/userService';
import { CredentialsType } from './types/auth';



export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "database",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const { email, password } = credentials as CredentialsType;
          const user = await handleLogin(email, password);
          console.log(user)
          if (!user) {
            return null
          }
          return {
            id: user.id.toString(),
            email: user.email,
            name: user.fullName,
            role: user.role,
            contactNumber: user.contactNumber,
          };
        } catch (error) {
          console.error("Detailed auth error:", error);
          return null;
        }
      },
    }),
  ],
});
