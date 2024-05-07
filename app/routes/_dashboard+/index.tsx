import { LoaderFunctionArgs, json } from "@remix-run/node"
import { LogoutButton } from "~/components/logout-button"
import { ModeToggle } from "~/components/mode-toggle"
import { requireUserId } from "~/utils/auth.server"

export async function loader({ request }: LoaderFunctionArgs) {
  await requireUserId(request)

  return json({})
}

export default function Index() {
  return (
    <div>
      <h1>Agenda</h1>
      <ModeToggle />
      <LogoutButton />
    </div>
  )
}
