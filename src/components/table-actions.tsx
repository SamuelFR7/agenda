"use client"

import { type Contact } from "@/db/schema"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"

import { DeleteContactAlertDialog } from "./dialogs/delete-contact-alert-dialog"
import { UpdateContactDialog } from "./dialogs/update-contact-dialog"
import { ViewContactDialog } from "./dialogs/view-contact-dialog"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

export function TableActions({ contact }: { contact: Contact }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem asChild>
          <ViewContactDialog contact={contact} />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <UpdateContactDialog contact={contact} />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <DeleteContactAlertDialog id={contact.id} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
