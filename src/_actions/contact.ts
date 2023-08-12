"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { contacts } from "@/db/schema"
import { createId } from "@paralleldrive/cuid2"
import { eq } from "drizzle-orm"
import { type z } from "zod"

import {
  type contactSchema,
  type getContactSchema,
} from "@/lib/validations/contact"

export async function addContactAction(input: z.infer<typeof contactSchema>) {
  await db.insert(contacts).values({
    ...input,
    id: createId(),
  })

  revalidatePath("/")
}

export async function updateContactAction(
  input: z.infer<typeof contactSchema> & {
    id: string
  }
) {
  await db.update(contacts).set(input).where(eq(contacts.id, input.id))

  revalidatePath("/")
}

export async function deleteContactAction(
  input: z.infer<typeof getContactSchema>
) {
  await db.delete(contacts).where(eq(contacts.id, input.id))

  revalidatePath("/")
}

export async function getContactAction(
  input: z.infer<typeof getContactSchema>
) {
  const contact = await db
    .select()
    .from(contacts)
    .where(eq(contacts.id, input.id))

  if (!contact) {
    throw new Error("Contact not found")
  }

  return contact
}
