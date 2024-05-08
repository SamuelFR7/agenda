import { createCookieSessionStorage, redirect } from "@remix-run/node"
import { env } from "./env"
import { Session } from "./db/schema"
import { safeRedirect } from "remix-utils/safe-redirect"
import { combineResponseInits } from "./utils"

const secret = env.COOKIE_SECRET

const isProduction = env.NODE_ENV === "production"

export const authSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: [secret],
    ...(isProduction ? { domain: "agenda.grupoacs.net.br", secure: true } : {}),
  },
})

export async function handleNewSession(
  {
    request,
    session,
    redirectTo = "/",
  }: {
    request: Request
    session: Session
    redirectTo?: string
  },
  responseInit?: ResponseInit
) {
  const authSession = await authSessionStorage.getSession(
    request.headers.get("cookie")
  )

  authSession.set("sessionId", session.id)

  return redirect(
    safeRedirect(redirectTo),
    combineResponseInits(
      {
        headers: {
          "Set-Cookie": await authSessionStorage.commitSession(authSession, {
            expires: session.expiresAt,
          }),
        },
      },
      responseInit
    )
  )
}
