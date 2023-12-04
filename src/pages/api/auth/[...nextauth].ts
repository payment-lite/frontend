import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      httpOptions: {
        timeout: 40000,
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch("http://localhost:8000/api/v1/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify(credentials),
        });
        const datas: any = await res.json();
        return { ...datas.data.user, token: datas.data.token };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, session }) {
      if (account?.provider === "google") {
        const res = await fetch("http://localhost:8000/api/v1/auth/google", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify(user),
        });
        if (!res.ok) {
          return null;
        }
        const datas: any = await res.json();
        return { ...datas.data.user, token: datas.data.token };
      }
      if (user && account) {
        return user;
      }
      return token;
    },
    async session({ session, token, user }) {
      // @ts-ignore
      session.user = token;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin",
  },
};

export default NextAuth(authOptions);
