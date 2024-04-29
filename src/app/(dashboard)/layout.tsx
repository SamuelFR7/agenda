import React from "react"
import { redirect } from "next/navigation"
import { getUser } from "@/_actions/auth"

import { Header } from "@/components/header"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUser()
  if (!user) {
    return redirect("/sign-in")
  }

  const isAdmin = user.role === "admin"

  return (
    <>
      <Header isAdmin={isAdmin} />
      {children}
    </>
  )
}
