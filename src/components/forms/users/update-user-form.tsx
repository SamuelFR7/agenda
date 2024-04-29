"use client"

import { useTransition } from "react"
import Link from "next/link"
import { updateUserAction } from "@/_actions/auth"
import { type User } from "@/db/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Icons } from "@/components/icons"

const schema = z.object({
  username: z
    .string({ required_error: "Usuário é obrigatório" })
    .min(1, "Usuário é obrigatório")
    .toUpperCase(),
  role: z.enum(["user", "admin"]),
})

type Input = z.infer<typeof schema>

interface UpdateUserFormProps {
  userToUpdate: Pick<User, "username" | "role" | "id">
}

export function UpdateUserForm({ userToUpdate }: UpdateUserFormProps) {
  const [isPending, startTransition] = useTransition()

  const form = useForm<Input>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: userToUpdate.username,
      role: userToUpdate.role,
    },
  })

  function onSubmit(data: Input) {
    startTransition(async () => {
      const response = await updateUserAction({
        id: userToUpdate.id,
        ...data,
      })

      if (response.error) {
        toast.error(response.error)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        className="space-y-2.5"
      >
        <div className="grid grid-cols-3 gap-3">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Nome de usuário</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cargo</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="user">Usuário</SelectItem>
                    <SelectItem value="admin">Administrador</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-4">
          <Link
            className={buttonVariants({ variant: "secondary" })}
            href="/users"
          >
            Cancelar
          </Link>
          <Button type="submit" disabled={isPending}>
            {isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Salvar
          </Button>
        </div>
      </form>
    </Form>
  )
}
