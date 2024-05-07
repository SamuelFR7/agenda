import { LoaderFunctionArgs, json } from "@remix-run/node"
import { Form, Link, useLoaderData, useSubmit } from "@remix-run/react"
import { Pencil, PlusCircle } from "lucide-react"
import { buttonVariants } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import { db } from "~/utils/db/index.server"
import { requireUserWithRole } from "~/utils/permissions.server"
import { translateRole } from "~/utils/utils"

export async function loader({ request }: LoaderFunctionArgs) {
  await requireUserWithRole(request, "admin")

  const url = new URL(request.url)
  const searchParams = url.searchParams

  const name = searchParams.get("q")

  const users = await db.query.users.findMany({
    where: (users, { ilike }) =>
      name ? ilike(users.username, `%${name}%`) : undefined,
    columns: {
      id: true,
      username: true,
      role: true,
    },
  })

  return json({
    users,
    name,
  })
}

export default function UsersPage() {
  const data = useLoaderData<typeof loader>()
  const submit = useSubmit()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
          Contatos
        </h1>
        <Link to="/users/new" className={buttonVariants()}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Novo usuário
        </Link>
      </div>
      <div className="space-y-2.5">
        <Form
          id="contact-search"
          role="search"
          onChange={(event) => submit(event.currentTarget)}
        >
          <Input
            id="name"
            aria-label="Procurar por contatos"
            placeholder="Pesquisar"
            type="search"
            name="q"
            defaultValue={data.name || ""}
          />
        </Form>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Nome de usuário</TableHead>
                <TableHead className="w-[120px]">Cargo</TableHead>
                <TableHead className="w-[70px]"></TableHead>
                <TableHead className="w-[70px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    {user.username.toUpperCase()}
                  </TableCell>
                  <TableCell>{translateRole(user.role)}</TableCell>
                  <TableCell>
                    <Link
                      className={buttonVariants({
                        size: "xs",
                        variant: "outline",
                      })}
                      to={`/users/${user.id}`}
                    >
                      Editar
                      <Pencil className="ml-2 h-3 w-3" />
                    </Link>
                  </TableCell>
                  <TableCell>
                    {/* <DeleteUserAlertDialog id={user.id} /> */}
                  </TableCell>
                </TableRow>
              ))}

              {data.users.length === 0 && (
                <TableRow>
                  <TableCell
                    className="py-10 text-center text-muted-foreground"
                    colSpan={4}
                  >
                    Nenhum resultado encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
