import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import UniversityPortal from "@/university-portal"
import { ThemeProvider } from "@/components/theme-provider"
import { ToastProvider } from "@/components/toast-provider"
import { UserProvider } from "./UserContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "University Portal",
  description: "A comprehensive university portal for students",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <UserProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <UniversityPortal>{children}</UniversityPortal>
            <ToastProvider />
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  )
}
