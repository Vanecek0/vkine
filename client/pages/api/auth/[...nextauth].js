import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const callbacks = {}

export const options = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        Credentials({
            name: "credentials",
            credentials: {},
            async authorize(credentials, req) {
                const { email, password } = credentials;
                const user = await prisma.user.findFirst(
                    {
                        where: { email: email, password: password },
                    }
                );

                if (user.email == credentials.email && user.password == credentials.password) {
                    return user
                } else {
                    return false
                }
            }
        })
    ],
    callbacks: {
        async signIn({ account, profile }) {
            if (account.provider === "google") {
                return profile
            }
            return true // Do different verification for other providers that don't have `email_verified`
        },
        
    },
    pages: {
        signIn: "../../login",
        signUp: "../../register"
    },
    
    secret: process.env.NEXTAUTH_SECRET,

}
export default (req, res) => NextAuth(req, res, options)