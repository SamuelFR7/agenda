"use client"

import React from "react"
import { usePathname, useRouter } from "next/navigation"

import { useDebounce } from "@/hooks/use-debounce"

import { Input } from "./ui/input"

export function TableToolbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = React.useTransition()
  const [search, setSearch] = React.useState("")

  const debouncedSearch = useDebounce(search, 500)

  React.useEffect(() => {
    startTransition(() => {
      router.push(`${pathname}?name=${debouncedSearch}`)
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch])

  return (
    <div>
      <Input
        placeholder="Pesquisar por nome"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
    </div>
  )
}
