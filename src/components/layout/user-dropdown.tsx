"use client"

import { useState, useRef, useEffect } from "react"
import { User, Settings, HelpCircle, LogOut } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function UserDropdown() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(!open)} className="outline-none">
        <Avatar className="h-9 w-9 cursor-pointer">
          <AvatarFallback className="bg-primary/10 text-primary text-xs">JD</AvatarFallback>
        </Avatar>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border/30 rounded-xl shadow-lg z-50 py-1">
          <div className="px-4 py-2 border-b border-border/20 mb-1">
            <p className="text-sm font-semibold">John Doe</p>
            <p className="text-[11px] text-muted-foreground">john@example.com</p>
          </div>
          {[
            { icon: User, label: "Edit Profile", href: "/dashboard/profile" },
            { icon: Settings, label: "Account Settings", href: "/dashboard/settings" },
            { icon: HelpCircle, label: "Support", href: "#" },
          ].map((item) => (
            <a key={item.label} href={item.href}
              className="flex items-center gap-2.5 px-4 py-2 text-sm text-foreground hover:bg-muted/50 transition-colors">
              <item.icon className="h-4 w-4 text-muted-foreground" />
              {item.label}
            </a>
          ))}
          <div className="border-t border-border/20 mt-1 pt-1">
            <button className="flex items-center gap-2.5 px-4 py-2 text-sm text-destructive hover:bg-muted/50 transition-colors w-full text-left">
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
