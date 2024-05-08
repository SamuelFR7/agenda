import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node"
import { requireUser } from "~/utils/auth.server"
import { invariantResponse } from "@epic-web/invariant"
import { db } from "~/utils/db/index.server"
import { parseWithZod } from "@conform-to/zod"
import { contactSchema } from "~/utils/validations/contact"
import { contacts } from "~/utils/db/schema"
import { eq } from "drizzle-orm"
import { Form, Link, useActionData, useLoaderData } from "@remix-run/react"
import { getFormProps, getInputProps, useForm } from "@conform-to/react"
import { useIsPending } from "~/utils/misc"
import { Button, buttonVariants } from "~/components/ui/button"
import { FormItem } from "~/components/form-item"
import { Label } from "~/components/ui/label"
import { Input } from "~/components/ui/input"
import { FormMessage } from "~/components/form-message"
import { Loader2 } from "lucide-react"

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

export default function UpdateContactPage() {
  const data = useLoaderData<typeof loader>()
  const lastResult = useActionData<typeof action>()

  const [form, fields] = useForm({
    id: `update-contact-form-${data.contact.id}`,
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: contactSchema })
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    defaultValue: {
      ...data.contact,
    },
  })

  const isPending = useIsPending()

  return (
    <div>
      <Form method="post" {...getFormProps(form)} className="space-y-2.5">
        <div className="grid grid-cols-2 gap-3">
          <FormItem>
            <Label htmlFor={fields.name.id}>Nome</Label>
            <Input {...getInputProps(fields.name, { type: "text" })} />
            <FormMessage errors={fields.name.errors} />
          </FormItem>
          <FormItem>
            <Label htmlFor={fields.phone1.id}>Telefone 1</Label>
            <Input {...getInputProps(fields.phone1, { type: "text" })} />
            <FormMessage errors={fields.phone1.errors} />
          </FormItem>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <FormItem>
            <Label htmlFor={fields.contact1.id}>Contato 1</Label>
            <Input {...getInputProps(fields.contact1, { type: "text" })} />
            <FormMessage errors={fields.contact1.errors} />
          </FormItem>
          <FormItem>
            <Label htmlFor={fields.phone2.id}>Telefone 2</Label>
            <Input {...getInputProps(fields.phone2, { type: "text" })} />
            <FormMessage errors={fields.phone2.errors} />
          </FormItem>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <FormItem>
            <Label htmlFor={fields.contact2.id}>Contato 2</Label>
            <Input {...getInputProps(fields.contact2, { type: "text" })} />
            <FormMessage errors={fields.contact2.errors} />
          </FormItem>
          <FormItem>
            <Label htmlFor={fields.phone3.id}>Telefone 3</Label>
            <Input {...getInputProps(fields.phone3, { type: "text" })} />
            <FormMessage errors={fields.phone3.errors} />
          </FormItem>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <FormItem>
            <Label htmlFor={fields.contact3.id}>Contato 3</Label>
            <Input {...getInputProps(fields.contact3, { type: "text" })} />
            <FormMessage errors={fields.contact3.errors} />
          </FormItem>
          <FormItem>
            <Label htmlFor={fields.phone4.id}>Telefone 4</Label>
            <Input {...getInputProps(fields.phone4, { type: "text" })} />
            <FormMessage errors={fields.phone4.errors} />
          </FormItem>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <FormItem>
            <Label htmlFor={fields.contact4.id}>Contato 4</Label>
            <Input {...getInputProps(fields.contact4, { type: "text" })} />
            <FormMessage errors={fields.contact4.errors} />
          </FormItem>
          <FormItem>
            <Label htmlFor={fields.phone5.id}>Telefone 5</Label>
            <Input {...getInputProps(fields.phone5, { type: "text" })} />
            <FormMessage errors={fields.phone5.errors} />
          </FormItem>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <FormItem>
            <Label htmlFor={fields.contact5.id}>Contato 5</Label>
            <Input {...getInputProps(fields.contact5, { type: "text" })} />
            <FormMessage errors={fields.contact5.errors} />
          </FormItem>
          <FormItem>
            <Label htmlFor={fields.address.id}>Endereço</Label>
            <Input {...getInputProps(fields.address, { type: "text" })} />
            <FormMessage errors={fields.address.errors} />
          </FormItem>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <FormItem>
            <Label htmlFor={fields.email.id}>Email</Label>
            <Input {...getInputProps(fields.email, { type: "text" })} />
            <FormMessage errors={fields.email.errors} />
          </FormItem>
          <FormItem>
            <Label htmlFor={fields.observations.id}>Observações</Label>
            <Input {...getInputProps(fields.observations, { type: "text" })} />
            <FormMessage errors={fields.observations.errors} />
          </FormItem>
        </div>
        <div className="flex w-full justify-end gap-4">
          <Link
            className={buttonVariants({
              variant: "secondary",
            })}
            to="/"
          >
            Voltar
          </Link>
          <Button disabled={isPending} type="submit">
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Salvar
          </Button>
        </div>
      </Form>
    </div>
  )
}

export async function action({ request, params }: ActionFunctionArgs) {
  await requireUser(request)

  const contactId = params.id
  invariantResponse(contactId, "Contact ID is required")

  const formData = await request.formData()

  const submission = parseWithZod(formData, { schema: contactSchema })

  if (submission.status !== "success") {
    return submission.reply()
  }

  await db
    .update(contacts)
    .set({
      ...submission.value,
    })
    .where(eq(contacts.id, contactId))

  return redirect("/")
}
