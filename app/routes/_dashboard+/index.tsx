import { LoaderFunctionArgs, json } from "@remix-run/node"
import {
  Form,
  Link,
  useLoaderData,
  useSearchParams,
  useSubmit,
} from "@remix-run/react"
import { count, ilike } from "drizzle-orm"
import { PlusCircle } from "lucide-react"
import { z } from "zod"
import { Pagination } from "~/components/pagination"
import { Input } from "~/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import { requireUser } from "~/utils/auth.server"
import { db } from "~/utils/db/index.server"
import { contacts } from "~/utils/db/schema"

export async function loader({ request }: LoaderFunctionArgs) {
  await requireUser(request)

  const url = new URL(request.url)
  const searchParams = url.searchParams

  const name = searchParams.get("name")
  const page = parseInt(searchParams.get("page") || "1")

  const limit = 10
  const offset = (page - 1) * limit

  const contactsQuery = await db.query.contacts.findMany({
    where: (contacts, { ilike }) =>
      name ? ilike(contacts.name, `%${name}%`) : undefined,
    columns: {
      id: true,
      name: true,
      phone1: true,
    },
    limit,
    offset,
    orderBy: (contacts, { asc }) => asc(contacts.name),
  })

  const [contactsCount] = await db
    .select({
      count: count(contacts.id),
    })
    .from(contacts)
    .where(name ? ilike(contacts.name, `%${name}%`) : undefined)

  return json({
    contacts: contactsQuery,
    totalCount: contactsCount.count,
    name,
  })
}

export default function Index() {
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
        <Link to="/new">
          <PlusCircle className="mr-2 h-4 w-4" />
          Novo contato
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
            name="name"
            defaultValue={data.name || ""}
          />
        </Form>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[174px]">Nome</TableHead>
                <TableHead className="w-[140px]">Telefone</TableHead>
                <TableHead className="w-[120px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.contacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell className="font-medium">{contact.name}</TableCell>
                  <TableCell>{contact.phone1}</TableCell>
                  <TableCell>
                    {/* <TableActions contact={contact} /> */}
                  </TableCell>
                </TableRow>
              ))}

              {data.contacts.length === 0 && (
                <TableRow>
                  <TableCell
                    className="py-10 text-center text-muted-foreground"
                    colSpan={3}
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
