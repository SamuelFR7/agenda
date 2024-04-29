import { redirect } from "next/navigation"
import { getUser } from "@/_actions/auth"

import { SignInForm } from "@/components/forms/sign-in-form"

export default async function SignInPage() {
  const user = await getUser()

  if (user) {
    redirect("/")
  }

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 ">
      <div className="hidden bg-muted lg:block"></div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Digite seu usuário e senha para acessar o sistema.
            </p>
          </div>

          <SignInForm />
        </div>
      </div>
    </div>
  )
}
