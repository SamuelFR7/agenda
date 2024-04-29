"use client"

import { useCallback } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { Input } from "@/components/ui/input"

interface UsersTableFilterProps {
  name?: string
}

export function UsersTableFilter({ name }: UsersTableFilterProps) {
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
    router.push(pathname + "?" + createQueryString("q", value))
  }

  return (
    <Input
      placeholder="Pesquisar"
      defaultValue={name}
      onChange={(e) => search(e.target.value)}
    />
  )
}
