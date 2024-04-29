"use client"

import { useCallback } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { Input } from "@/components/ui/input"

interface ContactsTableFilterProps {
  name?: string
}

export function ContactsTableFilter({ name }: ContactsTableFilterProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  function search(value: string) {
    router.push(pathname + "?" + createQueryString("name", value))
  }

  return (
    <Input
      placeholder="Pesquisar pelo nome"
      defaultValue={name}
      onChange={(event) => search(event.target.value)}
    />
  )
}
