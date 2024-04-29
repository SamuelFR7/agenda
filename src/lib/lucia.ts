import { adapter } from "@/db"
import { env } from "@/env.js"
import { Lucia } from "lucia"

const isProduction = env.NODE_ENV === "production"

export const lucia = new Lucia(adapter, {
  getUserAttributes: (attributes) => {
    return {
      username: attributes.username,
      role: attributes.role,
    }
  },
  sessionCookie: {
    expires: false,
    attributes: {
      ...(isProduction
        ? {
            secure: true,
            domain: "agenda.grupoacs.net.br",
            sameSite: "lax",
          }
        : {}),
    },
  },
})

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia
    DatabaseSessionAttributes: DatabaseSessionAttributes
    DatabaseUserAttributes: DatabaseUserAttributes
  }
}

interface DatabaseUserAttributes {
  username: string
  role: "user" | "admin"
}

interface DatabaseSessionAttributes {}
