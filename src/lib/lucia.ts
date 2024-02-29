import { connection } from "@/db"
import { env } from "@/env.mjs"
import { postgres } from "@lucia-auth/adapter-postgresql"
import { compare, hash } from "bcryptjs"
import { lucia } from "lucia"
import { nextjs_future } from "lucia/middleware"

export const auth = lucia({
  env: env.NODE_ENV === "production" ? "PROD" : "DEV",
  middleware: nextjs_future(),
  sessionCookie: {
    expires: false,
  },
  adapter: postgres(connection, {
    user: "users",
    key: "user_key",
    session: "user_session",
  }),
  getUserAttributes: (data) => {
    return {
      username: data.username,
    }
  },
  passwordHash: {
    generate: (password) => {
      return hash(password, 8)
    },
    validate: (password, hash) => {
      return compare(password, hash)
    },
  },
})

export type Auth = typeof auth
