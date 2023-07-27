"use server"

import { db } from "@/db"
import { users } from "@/db/schema"
import { compare } from "bcryptjs"
import { eq } from "drizzle-orm"
import { type z } from "zod"

import { type userSchema } from "@/lib/validations/user"

export async function signInAction(input: z.infer<typeof userSchema>) {
  const userExists = await db
    .select()
    .from(users)
    .where(eq(users.username, input.username))

  if (!userExists[0]) throw new Error("User or password are incorrects")

  const passwordMatches = await compare(input.password, userExists[0].password)

  if (!passwordMatches) throw new Error("User or password are incorrects")

  return {
    user: userExists[0],
  }
}
