import { db } from "@/db"
import { Contact, contacts } from "@/db/schema"
import { and, asc, desc, like, sql } from "drizzle-orm"

interface IndexPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function Home({ searchParams }: IndexPageProps) {
  const { page, per_page, sort, name } = searchParams

  const limit = typeof per_page === "string" ? parseInt(per_page) : 10

  const offset =
    typeof page === "string"
      ? parseInt(page) > 0
        ? (parseInt(page) - 1) * limit
        : 0
      : 0

  const [column, order] =
    typeof sort === "string"
      ? (sort.split(".") as [
          keyof Contact | undefined,
          "asc" | "desc" | undefined
        ])
      : []

  const { allContacts, totalContacts } = await db.transaction(async (tx) => {
    const allContacts = await tx
      .select()
      .from(contacts)
      .limit(limit)
      .offset(offset)
      .where(
        and(
          typeof name === "string"
            ? like(contacts.name, `%${name}%`)
            : undefined
        )
      )
      .orderBy(
        column && column in contacts
          ? order === "asc"
            ? asc(contacts[column])
            : desc(contacts[column])
          : desc(contacts.name)
      )

    const totalContacts = await tx
      .select({
        count: sql<number>`count(${contacts.id})`,
      })
      .from(contacts)
      .where(
        and(
          typeof name === "string"
            ? like(contacts.name, `%${name}%`)
            : undefined
        )
      )

    return {
      allContacts,
      totalContacts: Number(totalContacts[0]?.count) ?? 0,
    }
  })

  const pageCount = Math.ceil(totalContacts / limit)

  return (
    <main>
      <h1>Agenda</h1>
    </main>
  )
}
