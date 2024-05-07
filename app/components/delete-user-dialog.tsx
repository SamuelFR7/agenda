import { useFetcher } from "@remix-run/react"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog"
import { Button } from "./ui/button"
import { Trash } from "lucide-react"

export function DeleteUserDialog({ userId }: { userId: string }) {
  const fetcher = useFetcher()

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="xs">
          <Trash className="mr-2 h-3 w-3" />
          Deletar
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
          <fetcher.Form method="post" action={`/users/${userId}/delete`}>
            <Button type="submit" variant="destructive">
              Deletar
            </Button>
          </fetcher.Form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
