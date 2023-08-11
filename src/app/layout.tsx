import { Toaster } from "@/components/ui/toaster"

import "@/styles/globals.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { Header } from "@/components/header"
import { Providers } from "@/components/providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Agenda",
  description: "Agenda de contatos",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <Providers>
        <body className={inter.className}>
          <Header />
          <main>{children}</main>
        </body>
        <Toaster />
      </Providers>
    </html>
  )
}
