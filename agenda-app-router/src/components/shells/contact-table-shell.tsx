"use client"

import React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { type Contact } from "@/db/schema"

import { useDebounce } from "@/hooks/use-debounce"

import { AddContactDialog } from "../dialogs/add-contact-dialog"
import { DeleteContactAlertDialog } from "../dialogs/delete-contact-alert-dialog"
import { UpdateContactDialog } from "../dialogs/update-contact-dialog"
import { ViewContactDialog } from "../dialogs/view-contact-dialog"
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
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = React.useTransition()
  const [query, setQuery] = React.useState("")
  const debouncedQuery = useDebounce(query, 300)

  React.useEffect(() => {
    startTransition(() => {
      router.push(
        `${pathname}?name=${debouncedQuery}&page=${
          searchParams.get("page") ?? 1
        }`
      )
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery])

  return (
    <>
      <div className="flex gap-8">
        <Input
          placeholder="Pesquisar pelo nome"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <AddContactDialog />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Email</TableHead>
            <TableCell className="text-center">Opções</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending ? (
            <TableLoading />
          ) : (
            allContacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell className="truncate">{contact.name}</TableCell>
                <TableCell>{contact.phone1}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-2">
                    <UpdateContactDialog contact={contact} />
                    <DeleteContactAlertDialog id={contact.id} />
                    <ViewContactDialog contact={contact} />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <TablePagination
        currentPage={
          typeof currentPage === "string" ? parseInt(currentPage) : 1
        }
        dataCount={totalContacts}
      />
    </>
  )
}
