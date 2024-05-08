import { invariantResponse } from "@epic-web/invariant"
import { ActionFunctionArgs, json } from "@remix-run/node"
import { and, eq, ne } from "drizzle-orm"
import { db } from "~/utils/db/index.server"
import { users } from "~/utils/db/schema"
import { requireUserWithRole } from "~/utils/permissions.server"

export async function action({ params, request }: ActionFunctionArgs) {
  const userId = params.id

  invariantResponse(userId, "User ID is required")

  const me = await requireUserWithRole(request, "admin")

  await db.delete(users).where(and(eq(users.id, userId), ne(users.id, me)))

  return json({})
}
