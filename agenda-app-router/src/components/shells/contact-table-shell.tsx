import { type Contact } from "@/db/schema"

import { TablePagination } from "../table-pagination"
import { TableToolbar } from "../table-toolbar"
import { Card, CardContent } from "../ui/card"
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
  return (
    <>
      <TableToolbar />
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
              {allContacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell>{contact.name}</TableCell>
                  <TableCell>{contact.phone1}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                </TableRow>
              ))}
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
