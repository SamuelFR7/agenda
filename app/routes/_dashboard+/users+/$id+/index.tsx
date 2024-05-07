import { parseWithZod } from "@conform-to/zod"
import { invariantResponse } from "@epic-web/invariant"
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node"
import { eq } from "drizzle-orm"
import { z } from "zod"
import { db } from "~/utils/db/index.server"
import { users } from "~/utils/db/schema"
import { requireUserWithRole } from "~/utils/permissions.server"

const schema = z.object({
  username: z
    .string({ required_error: "Digite um nome de usuário" })
    .min(1, "Digite um nome de usuário")
    .toUpperCase(),
  role: z.enum(["user", "admin"]).default("user"),
})

export async function loader({ request, params }: LoaderFunctionArgs) {
  await requireUserWithRole(request, "admin")

  const userId = params.id

  invariantResponse(userId, "User ID is required")

  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, userId),
    columns: {
      id: true,
      username: true,
      role: true,
    },
  })

  invariantResponse(user, "User not found", {
    status: 404,
  })

  return json({
    user,
  })
}

export default function UpdateUserPage() {}

export async function action({ request, params }: ActionFunctionArgs) {
  await requireUserWithRole(request, "admin")
  const userId = params.id

  invariantResponse(userId, "User ID is required")

  const formData = await request.formData()

  const submission = await parseWithZod(formData, {
    schema: schema.superRefine(async (data, ctx) => {
      const usernameAlreadyExists = await db.query.users.findFirst({
        where: (users, { eq, and, ne }) =>
          and(eq(users.username, data.username), ne(users.id, userId)),
      })

      if (usernameAlreadyExists) {
        ctx.addIssue({
          path: ["username"],
          code: z.ZodIssueCode.custom,
          message: "Já existe um usuário cadastrado com esse nome",
        })
        return
      }
    }),
    async: true,
  })

  if (submission.status !== "success") {
    return submission.reply()
  }

  await db
    .update(users)
    .set({
      ...submission.value,
    })
    .where(eq(users.id, userId))

  return redirect("/users")
}
