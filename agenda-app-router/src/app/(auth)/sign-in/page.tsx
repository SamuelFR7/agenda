import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SignInForm } from "@/components/forms/sign-in-form"

interface SignInPageProps {
  searchParams: {
    error?: string
  }
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const session = await getServerSession()

  if (session) {
    redirect("/?name=&page=1")
  }

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Card className="w-full max-w-[500px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <SignInForm signInError={searchParams.error ? true : false} />
        </CardContent>
      </Card>
    </div>
  )
}
