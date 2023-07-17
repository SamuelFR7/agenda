"use client"

import React from "react"
import { usePathname, useRouter } from "next/navigation"
import { type Contact } from "@/db/schema"

import { useDebounce } from "@/hooks/use-debounce"

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
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = React.useTransition()
  const [query, setQuery] = React.useState("")
  const debouncedQuery = useDebounce(query, 300)

  React.useEffect(() => {
    startTransition(() => {
      router.push(`${pathname}?name=${debouncedQuery}`)
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery])

  return (
    <>
      <div>
        <Input
          placeholder="Pesquisar pelo nome"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <Card className="w-full">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Email</TableHead>
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
