import { Link, isRouteErrorResponse, useRouteError } from "@remix-run/react"
import { buttonVariants } from "./ui/button"

export function GeneralErrorBoundary() {
  const error = useRouteError()

  return (
    <div className="min flex min-h-screen w-full flex-col items-center justify-center space-y-2 bg-destructive/40">
      <h1 className="text-lg text-destructive">
        {isRouteErrorResponse(error) ? <>{error.data}</> : <>Algo deu errado</>}
      </h1>
      <Link
        to="/"
        className={buttonVariants({
          variant: "destructive",
        })}
      >
        Voltar para o início
      </Link>
    </div>
  )
}
