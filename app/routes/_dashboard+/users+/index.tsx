import { LoaderFunctionArgs, json } from "@remix-run/node"
import {
  Form,
  Link,
  useLoaderData,
  useSearchParams,
  useSubmit,
} from "@remix-run/react"
import { and, count, ilike, ne } from "drizzle-orm"
import { Pencil, PlusCircle } from "lucide-react"
import { z } from "zod"
import { DeleteUserDialog } from "~/components/delete-user-dialog"
import { Pagination } from "~/components/pagination"
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
import { users } from "~/utils/db/schema"
import { requireUserWithRole } from "~/utils/permissions.server"
import { translateRole } from "~/utils/utils"

export async function loader({ request }: LoaderFunctionArgs) {
  const me = await requireUserWithRole(request, "admin")

  const url = new URL(request.url)
  const searchParams = url.searchParams

  const name = searchParams.get("q")
  const page = parseInt(searchParams.get("page") || "1")

  const limit = 10
  const offset = (page - 1) * limit

  const usersQuery = await db.query.users.findMany({
    where: (users, { ilike, and, ne }) =>
      and(
        ne(users.id, me),
        name ? ilike(users.username, `%${name}%`) : undefined
      ),
    columns: {
      id: true,
      username: true,
      role: true,
    },
    limit,
    offset,
  })

  const [usersCount] = await db
    .select({
      count: count(users.id),
    })
    .from(users)
    .where(
      and(
        ne(users.id, me),
        name ? ilike(users.username, `%${name}%`) : undefined
      )
    )

  return json({
    users: usersQuery,
    name,
    totalCount: usersCount.count,
  })
}

export default function UsersPage() {
  const data = useLoaderData<typeof loader>()
  const submit = useSubmit()
  const [searchParams, setSearchParams] = useSearchParams()

  const currentPage = z.coerce.number().parse(searchParams.get("page") ?? "1")

  function handlePaginate(pageNumber: number) {
    setSearchParams((prev) => {
      prev.set("page", pageNumber.toString())

      return prev
    })
  }

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
                    <DeleteUserDialog userId={user.id} />
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
        <Pagination
          currentPage={currentPage}
          onPageChange={handlePaginate}
          perPage={10}
          totalCount={data.totalCount}
        />
      </div>
    </div>
  )
}
