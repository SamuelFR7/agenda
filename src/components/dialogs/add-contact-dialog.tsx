"use client"

import { useState } from "react"

import { AddContactForm } from "../forms/add-contact-form"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"

export function AddContactDialog() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full font-medium md:max-w-[10rem]">
          Novo Contato
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Novo Contato</DialogTitle>
        </DialogHeader>
        <AddContactForm setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  )
}
