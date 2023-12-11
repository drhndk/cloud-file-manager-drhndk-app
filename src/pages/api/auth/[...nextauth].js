import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
export default NextAuth({
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXT_SECRET_JWT,
  providers: [
     GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET
      })
    // ...add more providers here
  ],
  callbacks: {
    async jwt({token,account,user}) {
      if (account?.provider === 'google') {
        const data = {
          name: user.name,
          email: user.email,
          image: user.image,
        }
        token.name = data.name,
        token.email = data.email,
        token.image = data.image
      }
      return token
    },
  },
  pages : {
    signIn: "/login",
  }
});

// async session({session,token}) {
    //   if ("email" in token) {
    //     session.user.email = token.email
    //   }

    //   if ("name" in token) {
    //     session.user.name = token.name
    //   }

    //   if("image" in token) {
    //     session.user.image = token.image
    //   }
    // }