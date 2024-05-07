import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Button } from "./ui/button"
import { Loader2, Search } from "lucide-react"
import { Contact } from "~/utils/db/schema"
import { Table, TableBody, TableCell, TableRow } from "./ui/table"

interface ViewContactDialogProps {
  contactId: string
}

export function ViewContactDialog({ contactId }: ViewContactDialogProps) {
  const [open, setOpen] = useState(false)

  const { data, isFetching } = useQuery({
    queryKey: ["contact", contactId],
    queryFn: () => getContactDetails({ contactId }),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: open,
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="xs">
          <Search className="h-3 w-3" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Contato
            {isFetching && (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            )}
          </DialogTitle>
          <DialogDescription>Detalhes do contato</DialogDescription>
        </DialogHeader>
        {data && (
          <div className="max-h-[450px] overflow-y-auto">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="text-muted-foreground">Nome</TableCell>
                  <TableCell className="text-right">
                    {data.contact.name}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-muted-foreground">
                    Telefone 1
                  </TableCell>
                  <TableCell className="text-right">
                    {data.contact.phone1}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-muted-foreground">
                    Contato 1
                  </TableCell>
                  <TableCell className="text-right">
                    {data.contact.contact1}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-muted-foreground">
                    Telefone 2
                  </TableCell>
                  <TableCell className="text-right">
                    {data.contact.phone2}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-muted-foreground">
                    Contato 2
                  </TableCell>
                  <TableCell className="text-right">
                    {data.contact.contact2}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-muted-foreground">
                    Telefone 3
                  </TableCell>
                  <TableCell className="text-right">
                    {data.contact.phone3}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-muted-foreground">
                    Contato 3
                  </TableCell>
                  <TableCell className="text-right">
                    {data.contact.contact3}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-muted-foreground">
                    Telefone 4
                  </TableCell>
                  <TableCell className="text-right">
                    {data.contact.phone4}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-muted-foreground">
                    Contato 4
                  </TableCell>
                  <TableCell className="text-right">
                    {data.contact.contact4}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-muted-foreground">
                    Telefone 5
                  </TableCell>
                  <TableCell className="text-right">
                    {data.contact.phone5}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-muted-foreground">
                    Contato 5
                  </TableCell>
                  <TableCell className="text-right">
                    {data.contact.contact5}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-muted-foreground">Email</TableCell>
                  <TableCell className="text-right">
                    {data.contact.email}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-muted-foreground">
                    Endereço
                  </TableCell>
                  <TableCell className="text-right">
                    {data.contact.address}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-muted-foreground">
                    Observações
                  </TableCell>
                  <TableCell className="text-right">
                    {data.contact.observations}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

type getContactDetailsResponse = {
  contact: Contact
}

async function getContactDetails({ contactId }: { contactId: string }) {
  const response = await fetch(`/${contactId}/view`)

  const data = (await response.json()) as getContactDetailsResponse

  return data
}
