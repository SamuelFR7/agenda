import { Toaster } from "@/components/ui/toaster"
import { Providers } from "@/components/providers"

import "@/styles/globals.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { getServerSession } from "next-auth"

import { Header } from "@/components/header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Agenda",
  description: "Agenda de contatos",
  icons: {
    icon: "/favicon.ico",
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
          <Header session={session} />
          <main>{children}</main>
        </body>
        <Toaster />
      </html>
    </Providers>
  )
}
