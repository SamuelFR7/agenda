import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { SignInForm } from "@/components/forms/sign-in-form"

export default async function SignInPage() {
  const session = await getServerSession()

  if (session) {
    redirect("/")
  }

  return (
    <div className="flex h-[80vh] w-full items-center justify-center">
      <SignInForm />
    </div>
  )
}
