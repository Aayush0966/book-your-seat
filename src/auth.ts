import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { handleLogin, handleGoogleSignIn } from './services/userService';
import { CredentialsType } from './types/auth';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
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
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          const result = await handleGoogleSignIn(
            user.email!,
            user.name!,
            account.providerAccountId
          );
          
          if (result.success) {
            // Update user object with database user info
            user.id = result.user.id.toString();
            user.email = result.user.email;
            user.name = result.user.fullName;
            (user as any).role = result.user.role;
            (user as any).contactNumber = result.user.contactNumber || undefined;
            return true;
          }
          return false;
        } catch (error) {
          console.error("Google sign-in callback error:", error);
          return false;
        }
      }
      return true;
    },
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
