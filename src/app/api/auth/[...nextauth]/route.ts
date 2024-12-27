import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"


const credentialOptions = {
    credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
    },
    async authorize(credentials: Record<string, string> | undefined) {
        if (!credentials) return null;
          
        // Add your authentication logic here
        return null;
    }
}

const handler = NextAuth({
    providers: [
        CredentialsProvider(credentialOptions)
    ],
})


export { handler as GET, handler as POST }