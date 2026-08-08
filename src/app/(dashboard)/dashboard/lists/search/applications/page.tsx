"use client"

import { useState } from "react"
import { Download, Edit3, Share2, TrendingUp, Copy, Archive, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { SearchListShell } from "@/components/sections/search-list"
import { SearchFilters } from "@/components/sections/search-filters"
import { MoreMenu } from "@/components/sections/more-menu"

type App = {
  name: string
  initials: string
  color: string
  type: string
  category: string
  owner: string
  activeUser: number
  newUser: number
  status: "Active" | "Beta" | "Archived"
}

const categories = ["Design", "Engineering", "Growth", "Content", "Research"]

const colors = ["bg-primary/15 text-primary", "bg-sky-500/15 text-sky-500", "bg-amber-500/15 text-amber-500", "bg-emerald-500/15 text-emerald-500", "bg-rose-500/15 text-rose-500"]

const apps: Omit<App, "color">[] = [
  { name: "Ant Design Pro", initials: "A", type: "Admin Template", category: "Engineering", owner: "Ant Group", activeUser: 11800, newUser: 1200, status: "Active" },
  { name: "Recharts", initials: "R", type: "Chart Library", category: "Engineering", owner: "Recharts Team", activeUser: 22400, newUser: 1800, status: "Active" },
  { name: "Mycogen UI", initials: "M", type: "Design System", category: "Design", owner: "Mycogen", activeUser: 6400, newUser: 520, status: "Active" },
  { name: "Base UI", initials: "B", type: "Component Library", category: "Engineering", owner: "MUI", activeUser: 14800, newUser: 950, status: "Active" },
  { name: "Design Tokens", initials: "D", type: "Design Tool", category: "Design", owner: "Eve Davis", activeUser: 3200, newUser: 210, status: "Beta" },
  { name: "Docs Portal", initials: "P", type: "Content Site", category: "Content", owner: "Docs Team", activeUser: 8800, newUser: 640, status: "Active" },
  { name: "Chatbot", initials: "C", type: "AI Assistant", category: "Growth", owner: "ML Team", activeUser: 15200, newUser: 2100, status: "Beta" },
  { name: "Legacy Admin", initials: "L", type: "Internal Tool", category: "Engineering", owner: "Ops", activeUser: 900, newUser: 12, status: "Archived" },
]

const authors = ["Ant Group", "Recharts Team", "Mycogen", "MUI", "Eve Davis", "Docs Team", "ML Team", "Ops"]

const statusStyles: Record<string, string> = {
  Active: "bg-success/10 text-success",
  Beta: "bg-warning/10 text-warning",
  Archived: "bg-muted text-muted-foreground",
}

function formatWan(n: number) {
  return n >= 10000 ? `${Math.floor(n / 10000)}w+` : n.toLocaleString("en-US")
}

export default function SearchApplicationsPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [author, setAuthor] = useState<string>("")
  const [rating, setRating] = useState<string>("")

  const toggleCategory = (c: string) =>
    setSelectedCategories((prev) => prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c])

  const filtered = apps.filter((a) => {
    if (selectedCategories.length && !selectedCategories.includes(a.category)) return false
    if (author && a.owner !== author) return false
    if (rating === "excellent" && a.activeUser < 10000) return false
    if (rating === "good" && a.activeUser < 4000) return false
    return true
  })

  return (
    <SearchListShell>
      <SearchFilters
        categories={categories}
        selectedCategories={selectedCategories}
        onToggleCategory={toggleCategory}
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">Author</span>
          <Select value={author || undefined} onValueChange={(v) => setAuthor(v ?? "")}>
            <SelectTrigger className="w-44" aria-label="Author">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              {authors.map((a) => (
                <SelectItem key={a} value={a}>{a}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">Rating</span>
          <Select value={rating || undefined} onValueChange={(v) => setRating(v ?? "")}>
            <SelectTrigger className="w-36" aria-label="Rating">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="excellent">Excellent</SelectItem>
              <SelectItem value="good">Good</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </SearchFilters>

      {filtered.length === 0 ? (
        <Card size="sm" className="bg-card card-original shadow-sm">
          <CardContent className="px-6 py-12 text-center text-sm text-muted-foreground">
            No applications match your filters.
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((a, i) => (
            <Card key={a.name} size="sm" className="bg-card card-original shadow-sm hover:shadow-md transition-shadow relative [--card-spacing:12px]!">
              <Badge className={`absolute top-0 right-3 z-10 text-[11px] font-semibold px-1.5 py-0.5 h-auto border-0 rounded-t-none rounded-b-md ${statusStyles[a.status]}`}>
                {a.status}
              </Badge>
              <CardContent className="px-4">
                <div className="flex items-center gap-2.5 pr-10">
                  <span className={`size-9 rounded-lg flex items-center justify-center text-sm font-bold ${colors[i % colors.length]}`}>
                    {a.initials}
                  </span>
                  <div className="min-w-0 flex-1">
                    <a href="#" onClick={(e) => e.preventDefault()} className="text-sm font-semibold hover:text-primary transition-colors truncate block">
                      {a.name}
                    </a>
                    <p className="text-xs text-muted-foreground truncate">{a.type}</p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 rounded-lg border border-border/40 p-3">
                  <div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <TrendingUp className="size-3" /> Active users
                    </p>
                    <p className="text-base font-bold mt-0.5">{formatWan(a.activeUser)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">New users</p>
                    <p className="text-base font-bold mt-0.5">+{a.newUser.toLocaleString("en-US")}</p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between pt-3 border-t border-border/20">
                  <span className="text-xs text-muted-foreground truncate">{a.owner}</span>
                  <TooltipProvider delay={100}>
                    <div className="flex items-center gap-0.5">
                      <Tooltip>
                        <TooltipTrigger render={<Button variant="ghost" size="icon-xs" aria-label={`Download ${a.name}`}><Download className="size-3.5" /></Button>} />
                        <TooltipContent>Download</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger render={<Button variant="ghost" size="icon-xs" aria-label={`Edit ${a.name}`}><Edit3 className="size-3.5" /></Button>} />
                        <TooltipContent>Edit</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger render={<Button variant="ghost" size="icon-xs" aria-label={`Share ${a.name}`}><Share2 className="size-3.5" /></Button>} />
                        <TooltipContent>Share</TooltipContent>
                      </Tooltip>
                      <MoreMenu
                        label={`More ${a.name}`}
                        items={[
                          { label: "Duplicate", icon: Copy },
                          { label: "Archive", icon: Archive },
                          { label: "Delete", icon: Trash2, variant: "destructive" },
                        ]}
                      />
                    </div>
                  </TooltipProvider>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </SearchListShell>
  )
}
