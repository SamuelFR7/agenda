"use server"

import * as context from "next/headers"
import { redirect } from "next/navigation"
import { LuciaError } from "lucia"
import { type z } from "zod"

import { auth } from "@/lib/lucia"
import { type userSchema } from "@/lib/validations/user"

export async function signInAction(data: z.infer<typeof userSchema>) {
  try {
    const key = await auth.useKey("username", data.username, data.password)
    const session = await auth.createSession({
      userId: key.userId,
      attributes: {},
    })

    const authRequest = auth.handleRequest("POST", context)
    authRequest.setSession(session)
    return redirect("/")
  } catch (e) {
    if (e instanceof LuciaError) {
      throw new Error("Senha ou usuário incorretos")
    }

    throw e
  }
}

export async function signOutAction() {
  const authRequest = auth.handleRequest("POST", context)

  const session = await authRequest.validate()

  if (!session) {
    throw new Error("No session found")
  }

  await auth.invalidateSession(session.sessionId)

  authRequest.setSession(null)

  return redirect("/")
}
