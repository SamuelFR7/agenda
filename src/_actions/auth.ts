"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { db } from "@/db"
import bcrypt from "bcryptjs"

import { lucia } from "@/lib/lucia"

export async function getUser() {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null
  if (!sessionId) return null
  const { user, session } = await lucia.validateSession(sessionId)
  try {
    if (session && session.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id)
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      )
    }
    if (!session) {
      const sessionCookie = lucia.createBlankSessionCookie()
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      )
    }
  } catch {
    // Next.js throws error when attempting to set cookies when rendering page
  }
  return user
}

export async function signInAction({
  username,
  password,
}: {
  username: string
  password: string
}) {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, username.toUpperCase()),
  })

  if (!user) {
    return {
      error: "Usuário ou senha incorretos",
    }
  }

  const validPassword = await bcrypt.compare(password, user.passwordHash)

  if (!validPassword) {
    return {
      error: "Usuário ou senha incorretos",
    }
  }

  const session = await lucia.createSession(user.id, {})
  const sessionCookie = lucia.createSessionCookie(session.id)

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  )

  return redirect("/")
}

export async function signOutAction(): Promise<{ error: string } | null> {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null
  if (!sessionId)
    return {
      error: "Unauthorized",
    }
  const { session } = await lucia.validateSession(sessionId)

  if (!session) {
    return {
      error: "Unauthorized",
    }
  }

  await lucia.invalidateSession(session.id)

  const sessionCookie = lucia.createBlankSessionCookie()
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  )

  return redirect("/sign-in")
}
