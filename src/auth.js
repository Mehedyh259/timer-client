import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByEmail } from "./data";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: "jwt",
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      async authorize(credentials) {
        if (credentials === null) return null;
        try {
          const user = getUserByEmail(credentials?.email);
          if (user) {
            const isMatch = user?.password === credentials.password;
            if (isMatch) {
              return user;
            } else {
              throw new Error("password is wrong");
            }
          } else {
            throw new Error("user not found");
          }
        } catch (error) {
          throw new Error("error happend");
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET
});
