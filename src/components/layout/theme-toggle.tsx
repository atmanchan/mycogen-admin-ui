"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/providers/theme-provider"

export function ThemeToggle() {
  const { isDark, update } = useTheme()

  const toggle = () => update({ isDark: !isDark })

  return (
    <Button variant="ghost" size="icon-lg" onClick={toggle} aria-label="Toggle theme" className="relative">
      <Sun className={`h-[18px] w-[18px] transition-transform duration-200 ${isDark ? "scale-0 rotate-90" : "scale-100 rotate-0"}`} />
      <Moon className={`h-[18px] w-[18px] absolute transition-transform duration-200 ${isDark ? "scale-100 rotate-0" : "scale-0 -rotate-90"}`} />
    </Button>
  )
}
