import { redirect } from "next/navigation"
import { getUser } from "@/_actions/auth"
import { db } from "@/db"

import { UpdateUserForm } from "@/components/forms/users/update-user-form"

interface UpdateUserPage {
  params: {
    id: string
  }
}

export default async function UpdateUserPage({ params }: UpdateUserPage) {
  const user = await getUser()

  if (!user) {
    return redirect("/sign-in")
  }

  const { id } = params

  if (user.role !== "admin" || user.id === id) {
    return redirect("/users")
  }

  const userToUpdate = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, id),
    columns: {
      username: true,
      role: true,
      id: true,
    },
  })

  if (!userToUpdate) {
    return redirect("/")
  }

  return <UpdateUserForm userToUpdate={userToUpdate} />
}
