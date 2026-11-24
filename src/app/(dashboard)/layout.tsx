"use client"

import { useState, useSyncExternalStore } from "react"
import { usePathname } from "next/navigation"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { Toaster } from "sonner"

const emptySubscribe = () => () => {}
const useHydrated = () =>
  useSyncExternalStore(emptySubscribe, () => true, () => false)

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const hydrated = useHydrated()
  const pathname = usePathname()
  const [openForPath, setOpenForPath] = useState<string | null>(null)
  const sidebarOpen = openForPath === pathname

  if (!hydrated) return null

  return (
    <div className="flex min-h-dvh">
      <Sidebar open={sidebarOpen} onClose={() => setOpenForPath(null)} />
      <div className="flex-1 min-w-0 flex flex-col">
        <Header onMenuClick={() => setOpenForPath(pathname)} />
        <main className="flex-1 px-4 sm:px-8 pb-8 pt-6">
          {children}
        </main>
      </div>
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setOpenForPath(null)} />
      )}
      <Toaster position="top-right" />
    </div>
  )
}
