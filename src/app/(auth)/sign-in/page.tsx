import { redirect } from "next/navigation"
import { getUser } from "@/_actions/auth"

import { SignInForm } from "@/components/forms/sign-in-form"

export default async function SignInPage() {
  const user = await getUser()

  if (user) {
    redirect("/")
  }

  return (
    <div className="flex h-[80vh] w-full items-center justify-center">
      <SignInForm />
    </div>
  )
}
