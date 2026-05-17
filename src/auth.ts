import NextAuth from "next-auth"
import authConfig from "./auth.config"

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    session: {
        strategy: "jwt",
        maxAge: 2 * 60 * 60
    },
    trustHost: true,
    secret: process.env.AUTH_SECRET,
})