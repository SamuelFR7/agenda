import Link from "next/link"
import { redirect } from "next/navigation"
import { getUser } from "@/_actions/auth"
import { db } from "@/db"
import { Plus } from "lucide-react"

import { translateRole } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { UsersTableFilter } from "./users-table-filter"

interface UsersPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function UsersPage({ searchParams }: UsersPageProps) {
  const user = await getUser()

  const { q } = searchParams

  const name = typeof q === "string" ? q : undefined

  if (!user) {
    return redirect("/sign-in")
  }

  const users = await db.query.users.findMany({
    columns: {
      id: true,
      username: true,
      role: true,
    },
    where: (users, { ne, and, ilike }) =>
      and(
        ne(users.id, user.id),
        name ? ilike(users.username, `%${name}%`) : undefined
      ),
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
          Usuários
        </h1>
        <Link className={buttonVariants()} href="/users/new">
          <Plus className="mr-2 h-4 w-4" />
          Novo usuário
        </Link>
      </div>
      <div className="space-y-2.5">
        <UsersTableFilter name={name} />
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Nome de usuário</TableHead>
                <TableHead className="w-[120px]">Cargo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    {user.username.toUpperCase()}
                  </TableCell>
                  <TableCell>{translateRole(user.role)}</TableCell>
                </TableRow>
              ))}

              {users.length === 0 && (
                <TableRow>
                  <TableCell
                    className="py-10 text-center text-muted-foreground"
                    colSpan={2}
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
