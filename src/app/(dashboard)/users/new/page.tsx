import { redirect } from "next/navigation"
import { getUser } from "@/_actions/auth"

import { AddUserForm } from "@/components/forms/users/add-user-form"

export default async function NewUserPage() {
  const user = await getUser()

  if (!user) {
    return redirect("/sign-in")
  }

  if (user.role !== "admin") {
    return redirect("/")
  }

  return <AddUserForm />
}
