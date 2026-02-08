import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";

import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "database",
  },

  callbacks: {
    session({ session, user }: { session: any; user: any }) {
      // Attach User ID
      if (session.user) {
        session.user.id = user.id;
        session.user.userName = user.userName;
      }
      return session;
    },
  },
};
