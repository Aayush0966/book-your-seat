import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { handleLogin } from './services/userService';
import { CredentialsType } from './types/auth';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const { email, password } = credentials as unknown as CredentialsType;
          const user = await handleLogin(email, password);
          if (!user) {
            return null;
          }
          return {
            id: user.id.toString(),
            email: user.email,
            name: user.fullName,
            role: user.role,
            contactNumber: user.contactNumber ? Number(user.contactNumber) : undefined,
          };
        } catch (error) {
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
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = (user as any).role;
        token.contactNumber = (user as any).contactNumber;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
        session.user.contactNumber = token.contactNumber as number;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
});
