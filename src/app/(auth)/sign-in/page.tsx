import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SignInForm } from "@/components/forms/sign-in-form"

export default async function SignInPage() {
  const user = await currentUser()

  if (user) {
    redirect("/")
  }

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Card className="w-full max-w-[500px] bg-zinc-100">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
      </Card>
    </div>
  )
}
