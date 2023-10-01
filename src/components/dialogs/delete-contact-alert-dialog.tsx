"use client"

import React from "react"
import { deleteContactAction } from "@/_actions/contact"
import { Trash } from "lucide-react"
import { toast } from "sonner"

import { catchError } from "@/lib/utils"

import { Icons } from "../icons"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog"
import { Button } from "../ui/button"

interface DeleteContactAlertDialogProps {
  id: string
}

export function DeleteContactAlertDialog({
  id,
}: DeleteContactAlertDialogProps) {
  const [isPending, startTransition] = React.useTransition()

  function submit() {
    startTransition(async () => {
      try {
        await deleteContactAction({ id })
        toast.success("Contato deletado com sucesso")
      } catch (error) {
        catchError(error)
      }
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex w-full items-center justify-start gap-2 px-2 font-normal"
        >
          <Trash size={16} />
          <span>Deletar</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não poderá ser desfeita
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button disabled={isPending} onClick={submit} variant="destructive">
              {isPending && (
                <Icons.spinner
                  className="mr-2 h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              Deletar
              <span className="sr-only">Deletar</span>
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
