import * as context from "next/headers"
import { redirect } from "next/navigation"
import { db } from "@/db"
import { contacts } from "@/db/schema"
import { and, count, ilike } from "drizzle-orm"

import { auth } from "@/lib/lucia"
import { ContactTableShell } from "@/components/shells/contact-table-shell"
import { Shell } from "@/components/shells/shell"

interface IndexPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export const dynamic = "force-dynamic"

export default async function Home({ searchParams }: IndexPageProps) {
  const authRequest = auth.handleRequest("GET", context)
  const session = await authRequest.validate()
  if (!session) {
    redirect("/sign-in")
  }

  const { page, name } = searchParams

  const limit = 10

  const offset =
    typeof page === "string"
      ? parseInt(page) > 0
        ? (parseInt(page) - 1) * limit
        : 0
      : 0

  const { allContacts, totalContacts } = await db.transaction(async (tx) => {
    const allContacts = await tx
      .select()
      .from(contacts)
      .limit(limit)
      .offset(offset)
      .where(
        and(
          typeof name === "string"
            ? ilike(contacts.name, `%${name}%`)
            : undefined
        )
      )
      .orderBy(contacts.name)

    const totalContacts = await tx
      .select({
        count: count(contacts.id),
      })
      .from(contacts)
      .where(
        and(
          typeof name === "string"
            ? ilike(contacts.name, `%${name}%`)
            : undefined
        )
      )

    return {
      allContacts,
      totalContacts: Number(totalContacts[0]?.count) ?? 0,
    }
  })

  return (
    <Shell>
      <ContactTableShell
        allContacts={allContacts}
        totalContacts={totalContacts}
        currentPage={page}
      />
    </Shell>
  )
}
