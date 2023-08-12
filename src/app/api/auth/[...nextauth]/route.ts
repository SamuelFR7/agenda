import { db } from "@/db"
import { users } from "@/db/schema"
import { compare } from "bcryptjs"
import { eq } from "drizzle-orm"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

import { userSchema } from "@/lib/validations/user"

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        username: { type: "text" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        const parsedCredentials = userSchema.parse(credentials)

        const user = await db
          .select()
          .from(users)
          .where(eq(users.username, parsedCredentials.username))

        const queriedUser = user[0]

        if (!queriedUser) {
          return null
        }

        const passwordMatches = await compare(
          parsedCredentials.password,
          queriedUser.password
        )

        if (!passwordMatches) {
          return null
        }

        return {
          id: queriedUser.id,
          email: queriedUser.username,
          image: "",
          name: queriedUser.username,
        }
      },
    }),
  ],
})

export { handler as GET, handler as POST }
