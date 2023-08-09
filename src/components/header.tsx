"use client"

import React from "react"
import { useRouter } from "next/navigation"

import { Icons } from "./icons"
import { Button } from "./ui/button"

interface HeaderProps {
  user: null
}

export function Header({ user }: HeaderProps) {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()

  return (
    <header className="w-full bg-emerald-400 text-white">
      <div className="mx-auto flex w-full max-w-[1290px] items-center justify-between py-3">
        <h1 className="text-3xl font-bold">Agenda</h1>
        {user && (
            <Button aria-label="Sair" size="sm" disabled={isPending}>
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
