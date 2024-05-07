import { db } from "./db/index.server"
import { sessions } from "./db/schema"
import { authSessionStorage } from "./session.server"
import { redirect } from "@remix-run/node"
import bcrypt from "bcryptjs"
import { safeRedirect } from "remix-utils/safe-redirect"
import { combineHeaders } from "./utils"
import { eq } from "drizzle-orm"

export const SESSION_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 30
export function getSessionExpirationDate() {
  return new Date(Date.now() + SESSION_EXPIRATION_TIME)
}
export const sessionKey = "sessionId"

export async function getUser(request: Request) {
  const authSession = await authSessionStorage.getSession(
    request.headers.get("cookie")
  )

  const sessionId = authSession.get(sessionKey)
  if (!sessionId) return null

  const session = await db.query.sessions.findFirst({
    with: {
      user: true,
    },
    where: (sessions, { and, eq, gt }) =>
      and(
        eq(sessions.id, sessionId),
        gt(sessions.expiresAt, new Date(Date.now()))
      ),
  })

  if (!session?.user) {
    throw redirect("/sign-in", {
      headers: {
        "Set-Cookie": await authSessionStorage.destroySession(authSession),
      },
    })
  }

  return {
    userId: session.user.id,
    role: session.user.role,
  }
}

export async function requireUser(
  request: Request,
  { redirectTo }: { redirectTo?: string | null } = {}
) {
  const user = await getUser(request)
  if (!user) {
    const requestUrl = new URL(request.url)
    redirectTo =
      redirectTo === null
        ? null
        : redirectTo ?? `${requestUrl.pathname}${requestUrl.search}`
    const loginParams = redirectTo ? new URLSearchParams({ redirectTo }) : null
    const loginRedirect = ["/sign-in", loginParams?.toString()]
      .filter(Boolean)
      .join("?")

    throw redirect(loginRedirect)
  }

  return user
}

export async function requireAnonymous(request: Request) {
  const user = await getUser(request)
  if (user) {
    throw redirect("/")
  }
}

export async function login({
  username,
  password,
}: {
  username: string
  password: string
}) {
  const user = await verifyUserPassword({ username, password })

  if (!user) return null

  const [session] = await db
    .insert(sessions)
    .values({
      expiresAt: getSessionExpirationDate(),
      userId: user.id,
    })
    .returning()

  return session
}

export async function verifyUserPassword({
  username,
  password,
}: {
  username: string
  password: string
}) {
  const userWithPassword = await db.query.users.findFirst({
    columns: {
      id: true,
      passwordHash: true,
    },
    where: (users, { eq }) => eq(users.username, username),
  })

  if (!userWithPassword) return null

  const isValid = await bcrypt.compare(password, userWithPassword.passwordHash)

  if (!isValid) return null

  return {
    id: userWithPassword.id,
  }
}

export async function logout(
  {
    request,
    redirectTo = "/sign-in",
  }: {
    request: Request
    redirectTo?: string
  },
  responseInit?: ResponseInit
) {
  const authSession = await authSessionStorage.getSession(
    request.headers.get("cookie")
  )

  const sessionId = authSession.get(sessionKey)

  if (sessionId) {
    await db.delete(sessions).where(eq(sessions.id, sessionId))
  }

  throw redirect(safeRedirect(redirectTo), {
    ...responseInit,
    headers: combineHeaders(
      {
        "Set-Cookie": await authSessionStorage.destroySession(authSession),
      },
      responseInit?.headers
    ),
  })
}

export async function getPasswordHash(password: string) {
  const hash = await bcrypt.hash(password, 10)
  return hash
}
