import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import Auth0Provider from "next-auth/providers/auth0";

import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "./lib/mongodb"



const AUTH0_CLIENT_ID = 'xv6vjI6z1XM98ABaLifJrNhzAEbO7pqQ'
const AUTH0_CLIENT_SECRET = '7gUt55SAQLe-tOWFV2CvrMR2vevtcZIpMv4qUnSnh-yQDm-diiDMFZQEIceSMzjo'
const AUTH0_ISSUER = 'https://dev-vpn55gr2rnm4olzk.eu.auth0.com' 

const GITHUB_ID = 'Iv1.edf9a4d55aa4d7e6'
const GITHUB_SECRET = '09ac52584392f38b391f6f685d5bf5b9b9eff0d1'

// const GOOGLE_CLIENT_ID = '116518956968-nn91mabgckms9m14vh1d2lkllg831idg.apps.googleusercontent.com'
// const GOOGLE_CLIENT_SECRET = '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'



export const authOptions = {
  // Configure one or more authentication providers

  adapter: MongoDBAdapter(clientPromise),

  providers: [
  

    GithubProvider({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
    }),
    Auth0Provider({
      clientId: AUTH0_CLIENT_ID,
      clientSecret: AUTH0_CLIENT_SECRET,
      issuer: AUTH0_ISSUER
    })
    // ...add more providers here
  ],
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRET,
}

export default NextAuth(authOptions)