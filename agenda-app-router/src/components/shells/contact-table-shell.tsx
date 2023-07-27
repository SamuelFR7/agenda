"use client"

import React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { type Contact } from "@/db/schema"

import { useDebounce } from "@/hooks/use-debounce"

import { AddContactDialog } from "../dialogs/add-contact-dialog"
import { UpdateContactDialog } from "../dialogs/update-contact-dialog"
import { TableLoading } from "../table-loading"
import { TablePagination } from "../table-pagination"
import { Card, CardContent } from "../ui/card"
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
      <Card className="w-full">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Email</TableHead>
                <TableCell>Opções</TableCell>
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
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>
                      <UpdateContactDialog contact={contact} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <TablePagination
        currentPage={
          typeof currentPage === "string" ? parseInt(currentPage) : 1
        }
        dataCount={totalContacts}
      />
    </>
  )
}
