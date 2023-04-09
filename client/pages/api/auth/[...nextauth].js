import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"

export const options = {
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_ID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXT_PUBLIC_SECRET,
    
}
export default NextAuth(options)