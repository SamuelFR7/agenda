"use client"

import React from "react"
import { usePathname } from "next/navigation"
import { signOutAction } from "@/_actions/auth"

import { catchError } from "@/lib/utils"

import { Icons } from "./icons"
import { Shell } from "./shells/shell"
import { Button } from "./ui/button"

export function Header() {
  const pathname = usePathname()
  const [isPending, startTransition] = React.useTransition()

  function handleSignOut() {
    startTransition(async () => {
      try {
        await signOutAction()
      } catch (error) {
        catchError(error)
      }
    })
  }

  return (
    <header className="w-full bg-primary/80 text-white">
      <Shell className="grid-cols-2 justify-between">
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
      </Shell>
    </header>
  )
}
