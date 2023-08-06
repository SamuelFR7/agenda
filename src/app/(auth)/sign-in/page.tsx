import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { Card, CardContent } from "@/components/ui/card"
import { SignInForm } from "@/components/forms/sign-in-form"

export default async function SignInPage() {
  const user = await currentUser()

  if (user) {
    redirect("/")
  }

  return (
    <div className="flex h-[80vh] w-full items-center justify-center">
      <Card className="w-full max-w-[360px] bg-zinc-100 p-8">
        <CardContent>
          <SignInForm />
        </CardContent>
      </Card>
    </div>
  )
}
