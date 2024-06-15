import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import { paths } from "@/paths";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: paths.public.signIn,
    error: paths.common.error,
  },
  secret: process.env.NEXT_PUBLIC_JWT_KEY,
  providers: [
    CredentialsProvider({
      // @ts-ignore
      authorize: async (credentials: { data: any }) => {
        if (credentials?.data) {
          return JSON.parse(credentials.data);
        }
        throw new Error(
          `Login failed: Some error occurred while creating the session.`
        );
      },
    }),
  ],

  callbacks: {
    // @ts-ignore
    session: ({ token }) => {
      return token;
    },
    jwt: async ({ token, user }) => {
      return { ...token, ...user };
    },
  },
};
