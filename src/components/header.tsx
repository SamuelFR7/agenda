"use client"

import { type Session } from "next-auth"
import { signOut } from "next-auth/react"

import { Button } from "./ui/button"

interface HeaderProps {
  session: Session | null
}

export function Header({ session }: HeaderProps) {
  function submitSignOut() {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    signOut({
      callbackUrl: "/sign-in",
      redirect: true,
    })
  }

  return (
    <header className="w-full bg-emerald-400 text-white">
      <div className="mx-auto flex w-full max-w-[1290px] items-center justify-between py-3">
        <h1 className="text-3xl font-bold">Agenda</h1>
        {session && (
          <Button type="button" onClick={submitSignOut}>
            Sair
          </Button>
        )}
      </div>
    </header>
  )
}
