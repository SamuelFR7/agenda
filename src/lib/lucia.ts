import { connection } from "@/db"
import { env } from "@/env.mjs"
import { planetscale } from "@lucia-auth/adapter-mysql"
import { lucia } from "lucia"
import { nextjs_future } from "lucia/middleware"

export const auth = lucia({
  env: env.NODE_ENV === "production" ? "PROD" : "DEV",
  middleware: nextjs_future(),
  sessionCookie: {
    expires: false,
  },
  adapter: planetscale(connection, {
    user: "users",
    key: "user_key",
    session: "user_session",
  }),
  getUserAttributes: (data) => {
    return {
      username: data.username,
    }
  },
})

export type Auth = typeof auth
