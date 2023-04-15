import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const options = {
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_ID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET,
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
    session: {
        strategy: 'jwt',
        maxAge: 3 * 24 * 60 * 60,
    },
    secret: process.env.NEXT_PUBLIC_SECRET,

}
export default NextAuth(options)