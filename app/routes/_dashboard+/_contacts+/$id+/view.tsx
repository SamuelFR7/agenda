import { invariantResponse } from "@epic-web/invariant"
import { LoaderFunctionArgs, json } from "@remix-run/node"
import { requireUser } from "~/utils/auth.server"
import { db } from "~/utils/db/index.server"

export async function loader({ request, params }: LoaderFunctionArgs) {
  await requireUser(request)

  const contactId = params.id

  invariantResponse(contactId, "Contact ID is required")

  const contact = await db.query.contacts.findFirst({
    where: (contacts, { eq }) => eq(contacts.id, contactId),
  })

  invariantResponse(contact, "Contact not found", {
    status: 404,
  })

  return json({
    contact,
  })
}
