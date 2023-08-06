"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useSignIn } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { type z } from "zod"

import { catchClerkError, catchError } from "@/lib/utils"
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

export function SignInForm() {
  const form = useForm<Inputs>({
    resolver: zodResolver(userSchema),
  })
  const [isPending, startTransition] = React.useTransition()
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  function onSubmit(data: Inputs) {
    if (!isLoaded) return

    startTransition(async () => {
      try {
        const result = await signIn.create({
          identifier: data.username,
          password: data.password,
        })

        console.log(result)

        if (result.status === "complete") {
          await setActive({ session: result.createdSessionId })

          router.push(`${window.location.origin}/`)
        } else {
          console.log(result)
        }
      } catch (error) {
        catchClerkError(error)
      }
    })
  }

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
