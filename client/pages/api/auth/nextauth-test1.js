import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const providers = [
    GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
    })
]

const callbacks = {}

callbacks.signIn = async function signIn(account, profile) {
    if (account.provider === "google") {
        return profile
    }
    return true;
}

callbacks.jwt = async function jwt(token, user) {
    if (user) {
        token = { accessToken: user.accessToken }
    }
    return token
}

callbacks.session = async function session(session, token) {
    session.accessToken = token.accessToken
    return session
}

const options = {
    providers,
    callbacks
}

export default (req, res) => NextAuth(req, res, options)