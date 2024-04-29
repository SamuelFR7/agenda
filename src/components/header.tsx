"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOutAction } from "@/_actions/auth"
import { Menu, Notebook } from "lucide-react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"

import { Icons } from "./icons"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"

export function Header({ isAdmin }: { isAdmin: boolean }) {
  const pathname = usePathname()
  const [isPending, startTransition] = React.useTransition()

  function handleSignOut() {
    startTransition(async () => {
      const response = await signOutAction()

      if (response?.error) {
        toast.error(response.error)
      }
    })
  }

  return (
    <header className="top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Notebook className="h-6 w-6" />
        </Link>
        <Link
          href="/"
          className={cn(
            "text-muted-foreground transition-colors hover:text-foreground",
            pathname === "/" && "text-primary"
          )}
        >
          Contatos
        </Link>
        {isAdmin && (
          <Link
            href="/users"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Usuários
          </Link>
        )}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Notebook className="h-6 w-6" />
            </Link>
            <Link
              href="/"
              className={cn(
                "text-muted-foreground hover:text-foreground",
                pathname === "/" && "text-primary"
              )}
            >
              Contatos
            </Link>
            {isAdmin && (
              <Link
                href="/users"
                className="text-muted-foreground hover:text-foreground"
              >
                Usuários
              </Link>
            )}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <Button
          onClick={handleSignOut}
          size="icon"
          variant="outline"
          className="ml-auto"
          disabled={isPending}
        >
          {isPending ? (
            <Icons.spinner className="h-5 w-5 animate-spin" />
          ) : (
            <Icons.logout className="h-5 w-5" />
          )}
        </Button>
      </div>
    </header>
  )
}
