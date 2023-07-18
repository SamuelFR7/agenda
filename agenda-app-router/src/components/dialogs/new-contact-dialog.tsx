"use client"

import { useState } from "react"

import { NewContactForm } from "../forms/new-contact-form"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"

export function NewContactDialog() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full font-medium">Novo Contato</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Novo Contato</DialogTitle>
        </DialogHeader>
        <NewContactForm setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  )
}
