import { redirect } from "next/navigation"
import { getUser } from "@/_actions/auth"
import { db } from "@/db"
import { contacts } from "@/db/schema"
import { and, count, ilike } from "drizzle-orm"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AddContactDialog } from "@/components/dialogs/add-contact-dialog"
import { TableActions } from "@/components/table-actions"
import { TablePagination } from "@/components/table-pagination"

import { ContactsTableFilter } from "./contacts-table-filter"

interface IndexPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export const dynamic = "force-dynamic"

export default async function Home({ searchParams }: IndexPageProps) {
  const user = await getUser()
  if (!user) {
    redirect("/sign-in")
  }

  const { page, name } = searchParams

  const limit = 10

  const offset =
    typeof page === "string"
      ? parseInt(page) > 0
        ? (parseInt(page) - 1) * limit
        : 0
      : 0

  const { allContacts, totalContacts } = await db.transaction(async (tx) => {
    const allContacts = await tx
      .select()
      .from(contacts)
      .limit(limit)
      .offset(offset)
      .where(
        and(
          typeof name === "string"
            ? ilike(contacts.name, `%${name}%`)
            : undefined
        )
      )
      .orderBy(contacts.name)

    const totalContacts = await tx
      .select({
        count: count(contacts.id),
      })
      .from(contacts)
      .where(
        and(
          typeof name === "string"
            ? ilike(contacts.name, `%${name}%`)
            : undefined
        )
      )

    return {
      allContacts,
      totalContacts: Number(totalContacts[0]?.count) ?? 0,
    }
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
          Usuários
        </h1>
        <AddContactDialog />
      </div>
      <div className="space-y-2.5">
        <ContactsTableFilter
          name={typeof name === "string" ? name : undefined}
        />
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
              {allContacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell className="font-medium">{contact.name}</TableCell>
                  <TableCell>{contact.phone1}</TableCell>
                  <TableCell>
                    <TableActions contact={contact} />
                  </TableCell>
                </TableRow>
              ))}

              {allContacts.length === 0 && (
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
        <TablePagination
          currentPage={typeof page === "string" ? parseInt(page) : 1}
          dataCount={totalContacts}
        />
      </div>
    </div>
  )
}
