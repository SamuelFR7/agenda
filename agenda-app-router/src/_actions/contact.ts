"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { contacts } from "@/db/schema"
import { createId } from "@paralleldrive/cuid2"
import { type z } from "zod"

import { type createContactSchema } from "@/lib/validations/contact"

export async function newContactAction(
  input: z.infer<typeof createContactSchema>
) {
  await db.insert(contacts).values({
    id: createId(),
    name: input.name,
    phone1: input.phone_1,
    address: input.address,
    contact1: input.contact_1,
    contact2: input.contact_2,
    contact3: input.contact_3,
    contact4: input.contact_4,
    contact5: input.contact_5,
    email: input.email,
    observations: input.observations,
    phone2: input.phone_2,
    phone3: input.phone_3,
    phone4: input.phone_4,
    phone5: input.phone_5,
  })

  revalidatePath("/")
}
