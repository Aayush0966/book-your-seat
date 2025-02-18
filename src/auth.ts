import NextAuth, { CredentialsSignin } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { handleLogin } from './services/userService';
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
    signIn: "/auth",
    },
    session: {
    strategy: "jwt",
    maxAge: 30 * 60, // 30 mins
    },
    callbacks: {
    async jwt({token, user}) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({session, token}) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    }
  },
  debug: true,
  secret: process.env.AUTH_SECRET,
});
