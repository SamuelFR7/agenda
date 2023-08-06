"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { type z } from "zod"

import { catchError } from "@/lib/utils"
import { userSchema } from "@/lib/validations/user"

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

type Inputs = z.infer<typeof userSchema>

interface SignInFormProps {
  signInError: boolean
}

export function SignInForm({ signInError }: SignInFormProps) {
  const form = useForm<Inputs>({
    resolver: zodResolver(userSchema),
  })
  const [isPending, startTransition] = React.useTransition()

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        await signIn("credentials", {
          ...data,
          callbackUrl: "/?name=&page=1",
          redirect: true,
        })
      } catch (error) {
        catchError(error)
      }
    })
  }

  React.useEffect(() => {
    if (signInError) {
      form.setError("password", {
        message: "Usuário ou senha incorretos",
      })
      form.setError("username", {
        message: "Usuário ou senha incorretos",
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signInError])

  return (
    <Form {...form}>
      <form onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}>
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Usuário</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
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
          Entrar
          <span className="sr-only">Fazer login</span>
        </Button>
      </form>
    </Form>
  )
}
