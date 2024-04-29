"use client"

import React, { type SetStateAction } from "react"
import { updateContactAction } from "@/_actions/contact"
import { type Contact } from "@/db/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { type z } from "zod"

import { contactSchema } from "@/lib/validations/contact"

import { Icons } from "../icons"
import { Button } from "../ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"

type Inputs = z.infer<typeof contactSchema>

interface UpdateContactFormProps {
  setIsOpen: React.Dispatch<SetStateAction<boolean>>
  contact: Contact
}

export function UpdateContactForm({
  setIsOpen,
  contact,
}: UpdateContactFormProps) {
  const form = useForm<Inputs>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      ...contact,
    },
  })
  const [isPending, startTransition] = React.useTransition()

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      await updateContactAction({
        ...data,
        id: contact.id,
      })

      toast.success("Contato atualizado com sucesso")
      setIsOpen(false)
      form.reset()
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}>
        <div className="grid w-full grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone 1</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contact1"
            render={() => (
              <FormItem>
                <FormLabel>Contato 1</FormLabel>
                <FormControl>
                  <Input {...form.register("contact1")} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone2"
            render={() => (
              <FormItem>
                <FormLabel>Telefone 2</FormLabel>
                <FormControl>
                  <Input {...form.register("phone2")} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contact2"
            render={() => (
              <FormItem>
                <FormLabel>Contato 2</FormLabel>
                <FormControl>
                  <Input {...form.register("contact2")} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone3"
            render={() => (
              <FormItem>
                <FormLabel>Telefone 3</FormLabel>
                <FormControl>
                  <Input {...form.register("phone3")} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contact3"
            render={() => (
              <FormItem>
                <FormLabel>Contato 3</FormLabel>
                <FormControl>
                  <Input {...form.register("contact3")} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone4"
            render={() => (
              <FormItem>
                <FormLabel>Telefone 4</FormLabel>
                <FormControl>
                  <Input {...form.register("phone4")} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contact4"
            render={() => (
              <FormItem>
                <FormLabel>Contato 4</FormLabel>
                <FormControl>
                  <Input {...form.register("contact4")} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone5"
            render={() => (
              <FormItem>
                <FormLabel>Telefone 5</FormLabel>
                <FormControl>
                  <Input {...form.register("phone5")} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contact5"
            render={() => (
              <FormItem>
                <FormLabel>Contato 5</FormLabel>
                <FormControl>
                  <Input {...form.register("contact5")} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={() => (
              <FormItem>
                <FormLabel>Endereço</FormLabel>
                <FormControl>
                  <Input {...form.register("address")} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={() => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...form.register("email")} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="observations"
            render={() => (
              <FormItem>
                <FormLabel>Observações</FormLabel>
                <FormControl>
                  <Textarea
                    className="h-10 resize-none"
                    {...form.register("observations")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="mt-4 w-full" type="submit" disabled={isPending}>
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Salvar<span className="sr-only">Salvar</span>
        </Button>
      </form>
    </Form>
  )
}
