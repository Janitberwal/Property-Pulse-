import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prismadb";

export const authOptions = {
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
  ],
  callbacks: {
    //Invoked on sucess
    async signIn({ profile }) {
      try {
        //1.connect to db
        //2.check if user exists
        const existingUser = await prisma.user.findUnique({
          where: {
            email: profile.email,
          },
        });
        if (!existingUser) {
          //3.if not , create user
          await prisma.user.create({
            data: {
              name: profile.name,
              email: profile.email,
              image: profile.picture,
            },
          });
        }
        return true; //4.return true to allow sign in
      } catch (error) {
        console.error("Sign in error:", error);
        return false;
      }
    },
    //session callback function that modifies the session object
    async session({ session }) {
      // 1. Get user email from session
      const email = session.user.email;

      // 2. Fetch user from database using Prisma
      const userInDb = await prisma.user.findUnique({
        where: { email },
      });

      // 3. Assign user id to session and return it
      if (userInDb) {
        session.user.id = userInDb.id;
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);
