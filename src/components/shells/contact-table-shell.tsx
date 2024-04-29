"use client"

import React from "react"
import { usePathname, useRouter } from "next/navigation"
import { type Contact } from "@/db/schema"

import { AddContactDialog } from "../dialogs/add-contact-dialog"
import { TableActions } from "../table-actions"
import { TableLoading } from "../table-loading"
import { TablePagination } from "../table-pagination"
import { Input } from "../ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"

interface ContactTableShellProps {
  allContacts: Contact[]
  totalContacts: number
  currentPage: string | string[] | undefined
}

export function ContactTableShell({
  allContacts,
  totalContacts,
  currentPage,
}: ContactTableShellProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = React.useTransition()
  const [query, setQuery] = React.useState("")

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (query) {
      params.set("name", query)
      // eslint-disable-next-line drizzle/enforce-delete-with-where
      params.delete("page")
    } else {
      // eslint-disable-next-line drizzle/enforce-delete-with-where
      params.delete("name")
    }

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`)
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  return (
    <>
      <div className="flex flex-col-reverse gap-4 md:flex-row">
        <Input
          placeholder="Pesquisar pelo nome"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <AddContactDialog />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Telefone</TableHead>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isPending ? (
              <TableLoading />
            ) : (
              allContacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell>{contact.name}</TableCell>
                  <TableCell>{contact.phone1}</TableCell>
                  <TableCell>
                    <TableActions contact={contact} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        currentPage={
          typeof currentPage === "string" ? parseInt(currentPage) : 1
        }
        dataCount={totalContacts}
      />
    </>
  )
}
