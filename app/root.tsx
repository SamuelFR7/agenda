import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react"
import stylesheet from "./tailwind.css?url"
import {
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node"
import { themeSessionResolver } from "./utils/themes.server"
import { PreventFlashOnWrongTheme, ThemeProvider, useTheme } from "remix-themes"
import clsx from "clsx"
import { honeypot } from "./utils/honeypot.server"
import { HoneypotProvider } from "remix-utils/honeypot/react"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { GeneralErrorBoundary } from "./components/error-boundary"

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
]

export const meta: MetaFunction = () => {
  return [{ title: "Agenda" }]
}

export async function loader({ request }: LoaderFunctionArgs) {
  const { getTheme } = await themeSessionResolver(request)

  return {
    theme: getTheme(),
    honeypotInputProps: honeypot.getInputProps(),
  }
}

const queryClient = new QueryClient()

export default function AppWithProviders() {
  const data = useLoaderData<typeof loader>()

  return (
    <HoneypotProvider {...data.honeypotInputProps}>
      <ThemeProvider
        specifiedTheme={data.theme}
        themeAction="/action/set-theme"
      >
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ThemeProvider>
    </HoneypotProvider>
  )
}

function App() {
  const data = useLoaderData<typeof loader>()
  const [theme] = useTheme()

  return (
    <html lang="pt-BR" className={clsx(theme)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export function ErrorBoundary() {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <GeneralErrorBoundary />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}
