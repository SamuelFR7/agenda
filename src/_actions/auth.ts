"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { db } from "@/db"
import { users, type User } from "@/db/schema"
import bcrypt from "bcryptjs"
import { eq } from "drizzle-orm"
import { generateIdFromEntropySize } from "lucia"

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

export async function signUpUserAction({
  username,
  password,
  role,
}: {
  username: string
  password: string
  role: User["role"]
}): Promise<{ error?: string }> {
  const userAlreadyExists = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, username),
  })

  if (userAlreadyExists) {
    return {
      error: "Usuário já existe",
    }
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const userId = generateIdFromEntropySize(16)

  await db.insert(users).values({
    passwordHash,
    id: userId,
    username,
    role,
  })

  return redirect("/users")
}

export async function updateUserAction({
  username,
  role,
  id,
}: {
  username: string
  role: User["role"]
  id: string
}): Promise<{ error?: string }> {
  const usernameAlreadyExists = await db.query.users.findFirst({
    where: (users, { and, eq, ne }) =>
      and(ne(users.id, id), eq(users.username, username)),
    columns: {
      id: true,
    },
  })

  if (usernameAlreadyExists) {
    return {
      error: "Nome de usuário já existe",
    }
  }

  await db
    .update(users)
    .set({
      username,
      role,
    })
    .where(eq(users.id, id))

  return redirect("/users")
}
