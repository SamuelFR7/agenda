import { createThemeSessionResolver } from "remix-themes"
import { env } from "./env"
import { createCookieSessionStorage } from "@remix-run/node"

const isProduction = env.NODE_ENV === "production"

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "theme",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secrets: [env.COOKIE_SECRET],
    ...(isProduction ? { domain: "agenda.grupoacs.net.br", secure: true } : {}),
  },
})

export const themeSessionResolver = createThemeSessionResolver(sessionStorage)
