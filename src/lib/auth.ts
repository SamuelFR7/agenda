import { signInAction } from "@/_actions/user"
import { type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

import { userSchema } from "@/lib/validations/user"

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsedCredentials = userSchema.parse(credentials)

        try {
          const { user } = await signInAction({
            ...parsedCredentials,
          })

          return {
            id: user.id,
            email: "",
            image: "",
            name: user.username,
          }
        } catch (error) {
          console.log(error)
        }

        return null
      },
    }),
  ],
  pages: {
    error: "/sign-in?error=true",
    signIn: "/sign-in",
  },
}
