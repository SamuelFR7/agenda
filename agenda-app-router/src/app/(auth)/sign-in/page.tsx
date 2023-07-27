import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SignInForm } from "@/components/forms/sign-in-form"

interface SignInPageProps {
  searchParams: {
    error?: string
  }
}

export default function SignInPage({ searchParams }: SignInPageProps) {
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
