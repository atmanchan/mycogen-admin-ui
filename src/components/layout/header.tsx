"use client"

import { useEffect, useState } from "react"
import { Search } from "lucide-react"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { SettingsPanel } from "@/components/layout/settings-panel"
import { NotificationDropdown } from "@/components/layout/notification-dropdown"
import { UserDropdown } from "@/components/layout/user-dropdown"
import { useTheme } from "@/providers/theme-provider"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const { settingsOpen } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className={`flex items-center justify-between px-8 py-3 sticky top-0 z-20 transition-all duration-200 ${
      scrolled || settingsOpen ? "glass-light rounded-bl-xl" : "bg-transparent"
    }`}>
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products, orders..."
            className="w-full h-9 rounded-lg border border-border/60 bg-muted/40 hover:bg-background pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 focus:ring-3 focus:ring-primary/10 transition-all"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-muted-foreground border border-border px-1.5 rounded">
            &#8984;K
          </kbd>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <NotificationDropdown />
        <ThemeToggle />
        <SettingsPanel />
        <UserDropdown />
      </div>
    </header>
  )
}
