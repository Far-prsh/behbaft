import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import Auth0Provider from "next-auth/providers/auth0";

import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./lib/mongodb";
import User from "../../../../models/User";
import bcrypt from "bcrypt";

import db from "../../../utils/db";
db.connectDb();

const AUTH0_CLIENT_ID = "xv6vjI6z1XM98ABaLifJrNhzAEbO7pqQ";
const AUTH0_CLIENT_SECRET =
  "7gUt55SAQLe-tOWFV2CvrMR2vevtcZIpMv4qUnSnh-yQDm-diiDMFZQEIceSMzjo";
const AUTH0_ISSUER = "https://dev-vpn55gr2rnm4olzk.eu.auth0.com";

const GITHUB_ID = "Iv1.edf9a4d55aa4d7e6";
const GITHUB_SECRET = "09ac52584392f38b391f6f685d5bf5b9b9eff0d1";

// const GOOGLE_CLIENT_ID = '116518956968-nn91mabgckms9m14vh1d2lkllg831idg.apps.googleusercontent.com'
// const GOOGLE_CLIENT_SECRET = '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'

const signInUser = async ({ password, user }) => {
  if (!user.password) {
    throw new Error("Please enter your password");
  }
  const testPassword = await bcrypt.compare(password, user.password);

  if (!testPassword) {
    throw new Error("Email or password is wrong");
  }
  return user;
};

export const authOptions = {
  // Configure one or more authentication providers

  adapter: MongoDBAdapter(clientPromise),

  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const email = credentials.email;
        const password = credentials.password;
        const user = await User.findOne({ email });

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return signInUser({ password, user });
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          throw new Error("This email doesn't exist.");

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),

    GithubProvider({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
    }),
    Auth0Provider({
      clientId: AUTH0_CLIENT_ID,
      clientSecret: AUTH0_CLIENT_SECRET,
      issuer: AUTH0_ISSUER,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({ session, token }) {
      let user = await User.findById(token.sub);
      session.user.id = token.sub || user._id.toString();
      session.user.role = user.role || "user";
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);
