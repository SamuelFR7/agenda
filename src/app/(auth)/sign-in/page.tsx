import * as context from "next/headers"
import { redirect } from "next/navigation"

import { auth } from "@/lib/lucia"
import { SignInForm } from "@/components/forms/sign-in-form"

export default async function SignInPage() {
  const authRequest = auth.handleRequest("GET", context)
  const session = await authRequest.validate()
  if (session) {
    redirect("/")
  }

  return (
    <div className="flex h-[80vh] w-full items-center justify-center">
      <SignInForm />
    </div>
  )
}
