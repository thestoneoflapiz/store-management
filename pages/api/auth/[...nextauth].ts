import { verifyPassword } from "@/helpers/auth";
import { connectToDatabase } from "@/helpers/db";
import NextAuth, { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

const credentialSchema = z.object({
  username: z.string().min(8, "username should be minimum of 8 characters...").regex(/^[a-zA-Z0-9_]+$/g, "username should consist letters, numbers, or underscore only..."),
  password: z.string().min(8, "password should be minimum of 8 characters...")
})

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      // @ts-ignore
      async authorize(credentials){
        const { username, password } = credentialSchema.parse(credentials);
        
        const client = await connectToDatabase();
        const users = client.db().collection("users");
        const user = await users.findOne({username: username});
        if(!user){
          client.close();
          throw new Error("Invalid username & password...");
        }

        const isVerified = await verifyPassword(password || "", user.password);
        if(!isVerified){
          client.close();
          throw new Error("Invalid username & password...");
        }

        client.close();
        return {
          ...user, password: ""
        }
      }
    })
  ],
  callbacks: {
    session({ session, token }) {
      session.user = token.user;
      return session;
    },
    jwt({ token, account, user }) {
      if(account){
        token.accessToken = account.access_token;
        token.user = user;
      }
      return token;
    },
  },
  pages: {
    signIn: "/"
  },
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions);
