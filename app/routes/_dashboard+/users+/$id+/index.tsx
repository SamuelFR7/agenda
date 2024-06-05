import { getFormProps, getInputProps, useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import { invariantResponse } from "@epic-web/invariant"
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node"
import { Form, Link, useActionData, useLoaderData } from "@remix-run/react"
import { eq } from "drizzle-orm"
import { Loader2 } from "lucide-react"
import { z } from "zod"
import { FormItem } from "~/components/form-item"
import { FormMessage } from "~/components/form-message"
import { Button, buttonVariants } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import { db } from "~/utils/db/index.server"
import { users } from "~/utils/db/schema"
import { useIsPending } from "~/utils/misc"
import { requireUserWithRole } from "~/utils/permissions.server"

const schema = z.object({
  username: z
    .string({ required_error: "Digite um nome de usuário" })
    .min(1, "Digite um nome de usuário")
    .toUpperCase(),
  role: z.enum(["user", "admin"]).default("user"),
})

export async function loader({ request, params }: LoaderFunctionArgs) {
  const me = await requireUserWithRole(request, "admin")

  const userId = params.id

  invariantResponse(userId, "User ID is required")

  const user = await db.query.users.findFirst({
    where: (users, { eq, and, ne }) =>
      and(eq(users.id, userId), ne(users.id, me)),
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

export default function UpdateUserPage() {
  const data = useLoaderData<typeof loader>()
  const lastResult = useActionData<typeof action>()

  const [form, fields] = useForm({
    lastResult,
    id: `update-user-form-${data.user.id}`,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema })
    },
    defaultValue: {
      role: data.user.role,
      username: data.user.username,
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  })

  const isPending = useIsPending()

  return (
    <div>
      <Form className="space-y-2.5" method="post" {...getFormProps(form)}>
        <FormItem>
          <Label htmlFor={fields.username.id}>Nome de usuário</Label>
          <Input {...getInputProps(fields.username, { type: "text" })} />
          <FormMessage errors={fields.username.errors} />
        </FormItem>

        <FormItem>
          <Label htmlFor={fields.role.id}>Cargo</Label>
          <Select
            name={fields.role.name}
            defaultValue={fields.role.initialValue}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">Usuário</SelectItem>
              <SelectItem value="admin">Administrador</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage errors={fields.role.errors} />
        </FormItem>
        <div className="flex justify-end gap-4">
          <Link
            prefetch="intent"
            to="/users"
            className={buttonVariants({
              variant: "secondary",
            })}
          >
            Voltar
          </Link>
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Salvar
          </Button>
        </div>
      </Form>
    </div>
  )
}

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
