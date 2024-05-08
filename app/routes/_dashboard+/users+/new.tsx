import { getFormProps, getInputProps, useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node"
import { Form, Link, useActionData } from "@remix-run/react"
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
import { getPasswordHash } from "~/utils/auth.server"
import { db } from "~/utils/db/index.server"
import { users } from "~/utils/db/schema"
import { useIsPending } from "~/utils/misc"
import { requireUserWithRole } from "~/utils/permissions.server"

const schema = z.object({
  username: z
    .string({ required_error: "Digite um nome de usuário" })
    .min(1, "Digite um nome de usuário")
    .toUpperCase(),
  password: z
    .string({ required_error: "Digite uma senha" })
    .min(8, "A senha deve conter no minimo oito digitos"),
  role: z.enum(["user", "admin"]).default("user"),
})

export async function loader({ request }: LoaderFunctionArgs) {
  await requireUserWithRole(request, "admin")

  return json({})
}

export default function NewUserPage() {
  const lastResult = useActionData<typeof action>()
  const [form, fields] = useForm({
    lastResult,
    id: "new-user-form",
    onValidate({ formData }) {
      return parseWithZod(formData, { schema })
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    defaultValue: {
      role: "user",
    },
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
          <Label htmlFor={fields.password.id}>Senha</Label>
          <Input {...getInputProps(fields.password, { type: "password" })} />
          <FormMessage errors={fields.password.errors} />
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

export async function action({ request }: ActionFunctionArgs) {
  await requireUserWithRole(request, "admin")

  const formData = await request.formData()

  const submission = await parseWithZod(formData, {
    schema: schema.superRefine(async (data, ctx) => {
      const usernameAlreadyExists = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.username, data.username),
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

  const { password, role, username } = submission.value

  const passwordHash = await getPasswordHash(password)

  await db.insert(users).values({
    role,
    username,
    passwordHash,
  })

  return redirect("/users")
}
