import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook";
import Credentials from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function sha512(str) {
    const buf = await crypto.subtle.digest("SHA-512", new TextEncoder("utf-8").encode(str));
    return Array.prototype.map.call(new Uint8Array(buf), x => (('00' + x.toString(16)).slice(-2))).join('');
}


export const options = {
    providers: [
        GoogleProvider({
            name: "google",
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            },
            async profile(profile) {
                return {
                    id: profile.sub,
                    firstname: profile.given_name,
                    lastname: profile.family_name,
                    email: profile.email,
                    image: profile.picture,
                    provider: 'google'
                }
            },
        }),
        FacebookProvider({
            clientId: '288123576920305',
            clientSecret: 'b08ab5db7a97cd33003c631f27cefefa',
            id: "facebook",
            name: "Facebook",
            type: "oauth",
            authorization: "https://www.facebook.com/v11.0/dialog/oauth?scope=email",
            token: "https://graph.facebook.com/oauth/access_token",
            userinfo: {
                url: "https://graph.facebook.com/me",
                // https://developers.facebook.com/docs/graph-api/reference/user/#fields
                params: { fields: "id,first_name,last_name,email,picture" },
                async request({ tokens, client, provider }) {
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  return await client.userinfo(tokens.access_token, {
                    // @ts-expect-error
                    params: provider.userinfo?.params,
                  })
                },
              },
            async profile(profile) {
                console.log(profile)
                return {
                    id: profile.id,
                    firstname: profile.first_name,
                    lastname: profile.last_name,
                    email: profile.email,
                    image: profile.picture.data.url,
                    provider: 'facebook'
                }
            }
        }),
        Credentials({
            name: "credentials",
            async authorize(credentials) {
                const { email, password } = credentials;
                var dbuser = null;

                try {
                    dbuser = await prisma.user.findFirst(
                        {
                            where: {
                                email: email,
                            },
                            include: {
                                userData: true
                            }
                        }
                    );
                    if (!dbuser) {
                        throw ('login_invalid_user')
                    }
                } catch (error) {
                    throw new Error(error)
                }

                try {
                    const user = {
                        id: dbuser.id,
                        username: dbuser.username,
                        firstname: dbuser.userData.firstname,
                        lastname: dbuser.userData.lastname,
                        nickname: dbuser.userData.nickname,
                        email: dbuser.email,
                        profileImage: dbuser.userData.profileImage,
                        provider: dbuser.provider
                    };
                    if (dbuser.provider != "credentials") {
                        throw ('login_invalid_provider')
                    }
                    if (dbuser.email != email || dbuser.password != await sha512(dbuser.username + dbuser.username[0] + password)) {
                        throw Error('login_invalid_credentials')
                    }
                    return user;
                } catch (error) {
                    throw new Error(error)
                }
            }
        })
    ],
    callbacks: {
        async signIn({ user, account, profile, credentials }) {
            if (account.provider === "google") {

                // Upravit session objekt
                const modifiedSession = {
                    ...account,
                    user: {
                        ...user,
                        unauthorized: true,
                    },
                };
                return modifiedSession
            }
            if (account.provider === 'credentials') {
                return true
            }
            return true
        },
        async redirect({ url, baseUrl }) {
            if (url.startsWith("/")) {
                return `${baseUrl}${url}`
            }
            else if (new URL(url).origin === baseUrl) {
                return url
            }
            return baseUrl
        },
        async session({ session, token }) {
            session.user = token.user;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        },

    },
    pages: {
        signIn: "../../login",
        signUp: "../../signup"
    },
    session: {
        jwt: true,
        maxAge: 60 * 60 * 24,
    },

    secret: process.env.NEXTAUTH_SECRET,

}
export default (req, res) => NextAuth(req, res, options)