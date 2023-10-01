"use client"

import { useState } from "react"
import { type Contact } from "@/db/schema"
import { Pencil } from "lucide-react"

import { UpdateContactForm } from "../forms/update-contact-form"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"

export function UpdateContactDialog({ contact }: { contact: Contact }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex w-full items-center justify-start gap-2 px-2 font-normal"
        >
          <Pencil size={16} />
          <span>Editar</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Editar Contato</DialogTitle>
        </DialogHeader>
        <UpdateContactForm contact={contact} setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  )
}
