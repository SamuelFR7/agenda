import { type Contact } from "@/db/schema"
import { Eye } from "lucide-react"

import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

interface ViewContactDialogProps {
  contact: Contact
}
export function ViewContactDialog({ contact }: ViewContactDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Eye />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Visualizar Contato</DialogTitle>
        </DialogHeader>
        <div className="grid w-full grid-cols-2 gap-5">
          <div>
            <Label>Nome</Label>
            <Input
              type="text"
              className="disabled:opacity-100"
              disabled={true}
              value={contact.name}
            />
          </div>
          <div>
            <Label>Telefone 1</Label>
            <Input
              type="text"
              className="disabled:opacity-100"
              disabled={true}
              value={contact.phone1}
            />
          </div>
          <div>
            <Label>Contato 1</Label>
            <Input
              type="text"
              className="disabled:opacity-100"
              disabled={true}
              value={contact.contact1 ?? ""}
            />
          </div>
          <div>
            <Label>Telefone 2</Label>
            <Input
              type="text"
              className="disabled:opacity-100"
              disabled={true}
              value={contact.phone2 ?? ""}
            />
          </div>
          <div>
            <Label>Contato 2</Label>
            <Input
              type="text"
              className="disabled:opacity-100"
              disabled={true}
              value={contact.contact2 ?? ""}
            />
          </div>
          <div>
            <Label>Telefone 3</Label>
            <Input
              type="text"
              className="disabled:opacity-100"
              disabled={true}
              value={contact.phone3 ?? ""}
            />
          </div>
          <div>
            <Label>Contato 3</Label>
            <Input
              type="text"
              className="disabled:opacity-100"
              disabled={true}
              value={contact.contact3 ?? ""}
            />
          </div>
          <div>
            <Label>Telefone 4</Label>
            <Input
              type="text"
              className="disabled:opacity-100"
              disabled={true}
              value={contact.phone4 ?? ""}
            />
          </div>
          <div>
            <Label>Contato 4</Label>
            <Input
              type="text"
              className="disabled:opacity-100"
              disabled={true}
              value={contact.contact4 ?? ""}
            />
          </div>
          <div>
            <Label>Telefone 5</Label>
            <Input
              type="text"
              className="disabled:opacity-100"
              disabled={true}
              value={contact.phone5 ?? ""}
            />
          </div>
          <div>
            <Label>Contato 5</Label>
            <Input
              type="text"
              className="disabled:opacity-100"
              disabled={true}
              value={contact.contact5 ?? ""}
            />
          </div>
          <div>
            <Label>Endereço</Label>
            <Input
              type="text"
              className="disabled:opacity-100"
              disabled={true}
              value={contact.address ?? ""}
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              type="text"
              className="disabled:opacity-100"
              disabled={true}
              value={contact.email ?? ""}
            />
          </div>
          <div>
            <Label>Observações</Label>
            <Input
              type="text"
              className="disabled:opacity-100"
              disabled={true}
              value={contact.observations ?? ""}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
