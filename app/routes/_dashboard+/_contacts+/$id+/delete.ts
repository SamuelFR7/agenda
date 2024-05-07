import { invariantResponse } from "@epic-web/invariant"
import { ActionFunctionArgs, json } from "@remix-run/node"
import { eq } from "drizzle-orm"
import { requireUser } from "~/utils/auth.server"
import { db } from "~/utils/db/index.server"
import { contacts } from "~/utils/db/schema"

export async function action({ params, request }: ActionFunctionArgs) {
  await requireUser(request)

  const contactId = params.id

  invariantResponse(contactId, "Contact ID is required")

  await db.delete(contacts).where(eq(contacts.id, contactId))

  return json({})
}
