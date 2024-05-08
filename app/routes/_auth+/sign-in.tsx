import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node"
import { login, requireAnonymous } from "~/utils/auth.server"
import { parseWithZod } from "@conform-to/zod"
import { userSchema } from "~/utils/validations/user"
import { z } from "zod"
import { handleNewSession } from "~/utils/session.server"
import { Form, useActionData, useSearchParams } from "@remix-run/react"
import { useIsPending } from "~/utils/misc"
import { getFormProps, getInputProps, useForm } from "@conform-to/react"
import { FormItem } from "~/components/form-item"
import { Label } from "~/components/ui/label"
import { FormMessage } from "~/components/form-message"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { Loader2 } from "lucide-react"
import { HoneypotInputs } from "remix-utils/honeypot/react"
import { checkHoneypot } from "~/utils/honeypot.server"

const signInSchema = userSchema.extend({
  redirectTo: z.string().optional(),
})

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAnonymous(request)

  return json({})
}

export default function SignInPage() {
  const [searchParams] = useSearchParams()

  const redirectTo = searchParams.get("redirectTo")

  const lastResult = useActionData<typeof action>()
  const isPending = useIsPending()
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: signInSchema })
    },
    defaultValue: {
      redirectTo,
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  })

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 ">
      <div className="hidden bg-muted lg:block"></div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Digite seu usuário e senha para acessar o sistema.
            </p>
          </div>

          <Form className="space-y-2" method="post" {...getFormProps(form)}>
            <HoneypotInputs />
            <FormItem>
              <Label htmlFor={fields.username.id}>Usuário</Label>
              <Input {...getInputProps(fields.username, { type: "text" })} />
              <FormMessage errors={fields.username.errors} />
            </FormItem>
            <FormItem>
              <Label htmlFor={fields.password.id}>Senha</Label>
              <Input
                {...getInputProps(fields.password, { type: "password" })}
              />
              <FormMessage errors={fields.password.errors} />
            </FormItem>
            <input {...getInputProps(fields.redirectTo, { type: "hidden" })} />
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Entrar
            </Button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export async function action({ request }: ActionFunctionArgs) {
  await requireAnonymous(request)
  const formData = await request.formData()
  checkHoneypot(formData)

  const submission = await parseWithZod(formData, {
    schema: (intent) =>
      signInSchema.transform(async (data, ctx) => {
        if (intent !== null) return { ...data, session: null }

        const session = await login(data)

        if (!session) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Usuário ou senha inválidos",
            path: ["username"],
          })
          return z.NEVER
        }

        return {
          ...data,
          session,
        }
      }),
    async: true,
  })

  if (submission.status !== "success" || !submission.value.session) {
    return submission.reply({ hideFields: ["password"] })
  }

  const { session, redirectTo } = submission.value

  return handleNewSession({
    session,
    redirectTo,
    request,
  })
}
