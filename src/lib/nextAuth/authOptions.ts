import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import { login } from "../actions/auth";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXT_PUBLIC_JWT_KEY,
  providers: [
    CredentialsProvider({
      // @ts-ignore
      authorize: async (credentials: { email: string; password: string }) => {
        const { email, password } = credentials;
        let loginResponse: any = await login({ email, password });
        loginResponse = JSON.parse(loginResponse);
        if (loginResponse.status) {
          const { token, data } = loginResponse;
          return { token, ...data };
        }
        throw new Error(`Login failed: ${loginResponse.message}`);
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
