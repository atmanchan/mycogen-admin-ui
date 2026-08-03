import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/providers/theme-provider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Mycogen Admin",
  description: "Mycogen style admin dashboard",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            try {
              const saved = localStorage.getItem('mycogen-theme')
              let dark = false
              if (saved) {
                dark = !!JSON.parse(saved).isDark
              } else {
                dark = window.matchMedia('(prefers-color-scheme: dark)').matches
              }
              if (dark) document.documentElement.classList.add('dark')
            } catch(e) {}
          `
        }} />
      </head>
      <body className="min-h-dvh">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
