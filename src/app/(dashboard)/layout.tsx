import React from "react"
import * as context from "next/headers"
import { redirect } from "next/navigation"

import { auth } from "@/lib/lucia"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const authRequest = auth.handleRequest("GET", context)
  const session = await authRequest.validate()
  if (!session) {
    redirect("/sign-in")
  }

  return <main>{children}</main>
}
