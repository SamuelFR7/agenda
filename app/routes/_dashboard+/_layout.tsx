import { LoaderFunctionArgs, json } from "@remix-run/node"
import { Outlet, useLoaderData } from "@remix-run/react"
import { Header } from "~/components/header"
import { requireUser } from "~/utils/auth.server"

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUser(request)

  return json({
    isAdmin: user.role === "admin",
  })
}

export default function DashboardLayout() {
  const data = useLoaderData<typeof loader>()

  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header isAdmin={data.isAdmin} />
      <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
        <Outlet />
      </div>
    </div>
  )
}
