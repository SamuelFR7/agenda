import { LoaderFunctionArgs, json } from "@remix-run/node"
import { requireUser } from "~/utils/auth.server"

export async function loader({ request }: LoaderFunctionArgs) {
  await requireUser(request)

  return json({})
}

export default function Index() {
  return (
    <div>
      <h1>Agenda</h1>
    </div>
  )
}
