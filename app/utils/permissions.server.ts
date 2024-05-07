import { json } from "@remix-run/node"
import { requireUserId } from "./auth.server"
import { db } from "./db/index.server"
import { Role } from "./db/schema"

export async function requireUserWithRole(request: Request, role: Role) {
  const userId = await requireUserId(request)
  const user = await db.query.users.findFirst({
    where: (users, { and, eq }) =>
      and(eq(users.id, userId), eq(users.role, role)),
    columns: {
      id: true,
    },
  })

  if (!user) {
    throw json(
      {
        error: "Unauthorized",
        requiredRole: role,
        message: `Unauthorized required role ${role}`,
      },
      {
        status: 403,
      }
    )
  }

  return user.id
}
