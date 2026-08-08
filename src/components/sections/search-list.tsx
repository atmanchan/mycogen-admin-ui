"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const tabs = [
  { label: "Articles", href: "/dashboard/lists/search/articles" },
  { label: "Projects", href: "/dashboard/lists/search/projects" },
  { label: "Applications", href: "/dashboard/lists/search/applications" },
]

interface SearchListShellProps {
  children: React.ReactNode
}

export function SearchListShell({ children }: SearchListShellProps) {
  const pathname = usePathname()
  const [query, setQuery] = useState("")

  const activeHref =
    pathname === "/dashboard/lists/search"
      ? "/dashboard/lists/search/articles"
      : pathname

  const activeLabel = tabs.find((t) => t.href === activeHref)?.label ?? "Search"

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold tracking-tight">{activeLabel}</h1>

      <div className="w-full max-w-xl mx-auto relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-5 text-muted-foreground pointer-events-none" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search keyword..."
          aria-label="Search"
          className="pl-10 h-11 text-base md:text-base rounded-xl shadow-sm bg-background"
        />
      </div>

      <div className="flex items-center gap-1 border-b border-border/40 w-full">
        {tabs.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className={cn(
              "relative px-3 py-2 text-sm font-medium transition-colors -mb-px border-b-2",
              activeHref === t.href
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {t.label}
          </Link>
        ))}
      </div>

      {children}
    </div>
  )
}
