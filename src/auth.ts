import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { handleLogin } from './services/userService';
import { CredentialsType } from './types/auth';

console.log("Initializing NextAuth...");

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    Credentials({
      async authorize(credentials) {
        console.log("Authorizing credentials:", credentials);
        try {
          const { email, password } = credentials as unknown as CredentialsType;
          const user = await handleLogin(email, password);
          if (!user) {
            console.log("User not found");
            return null;
          }
          console.log("User authorized:", user);
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
  pages: {
    signIn: "/auth"
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 60, // 30 mins
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT callback - token:", token, "user:", user);
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("Session callback - session:", session, "token:", token);
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
});

console.log("NextAuth initialized.");
