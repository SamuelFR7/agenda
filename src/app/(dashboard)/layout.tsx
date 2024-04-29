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
    <div className="flex min-h-screen flex-col antialiased">
      <Header isAdmin={isAdmin} />
      <div className="flex flex-1 flex-col gap-4 p-8 pt-6">{children}</div>
    </div>
  )
}
