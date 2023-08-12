"use client"

import React from "react"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"

import { catchError } from "@/lib/utils"

import { Icons } from "./icons"
import { Button } from "./ui/button"

export function Header() {
  const pathname = usePathname()
  const [isPending, startTransition] = React.useTransition()

  function handleSignOut() {
    startTransition(async () => {
      try {
        await signOut({
          callbackUrl: "/sign-in",
          redirect: true,
        })
      } catch (error) {
        catchError(error)
      }
    })
  }

  return (
    <header className="w-full bg-primary/80 text-white">
      <div className="mx-auto flex w-full max-w-[1290px] items-center justify-between py-3">
        <h1 className="text-3xl font-bold">Agenda</h1>
        {pathname === "/" && (
          <Button
            onClick={handleSignOut}
            aria-label="Sair"
            size="sm"
            disabled={isPending}
          >
            {isPending ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.logout aria-hidden="true" className="mr-2 h-4 w-4" />
            )}
            Sair
          </Button>
        )}
      </div>
    </header>
  )
}
