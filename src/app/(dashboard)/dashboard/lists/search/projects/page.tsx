"use client"

import { useState } from "react"
import { Star, GitBranch, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SearchListShell } from "@/components/sections/search-list"
import { SearchFilters } from "@/components/sections/search-filters"

type Project = {
  id: number
  name: string
  description: string
  category: string
  cover: string
  members: string[]
  owner: string
  initials: string
  color: string
  star: string
  fork: string
  contributor: string
  updated: string
}

const categories = ["Design", "Engineering", "Growth", "Content", "Research"]

const memberColors = ["bg-primary/15 text-primary", "bg-sky-500/15 text-sky-500", "bg-amber-500/15 text-amber-500", "bg-emerald-500/15 text-emerald-500", "bg-rose-500/15 text-rose-500"]

const covers = [
  "from-primary/25 to-primary/5",
  "from-sky-500/25 to-sky-500/5",
  "from-amber-500/25 to-amber-500/5",
  "from-emerald-500/25 to-emerald-500/5",
  "from-violet-500/25 to-violet-500/5",
  "from-rose-500/25 to-rose-500/5",
]

const projects: Omit<Project, "id" | "cover" | "color">[] = [
  { name: "Checkout Redesign", category: "Engineering", description: "Rebuild the checkout flow with a focus on reducing abandoned carts. Includes a new payment UI, one-click reorder and regional tax handling.", members: ["AJ", "BS", "CW"], owner: "Alice Johnson", initials: "AJ", star: "1.2k", fork: "320", contributor: "24", updated: "2 hours ago" },
  { name: "Mobile App v2", category: "Design", description: "A ground-up redesign of the mobile experience with a refreshed design system, dark mode and offline-first data sync.", members: ["ED", "DB"], owner: "Eve Davis", initials: "ED", star: "890", fork: "210", contributor: "18", updated: "5 hours ago" },
  { name: "Inventory Sync", category: "Engineering", description: "Real-time inventory synchronization across warehouses with reconciliation, low-stock alerts and supplier feeds.", members: ["BS", "CW", "AJ", "DB"], owner: "Bob Smith", initials: "BS", star: "2.1k", fork: "540", contributor: "31", updated: "1 day ago" },
  { name: "Analytics Portal", category: "Growth", description: "A self-serve analytics portal where teams build custom dashboards, set goal tracking and export reports.", members: ["CW", "ED"], owner: "Carol White", initials: "CW", star: "640", fork: "120", contributor: "12", updated: "3 days ago" },
  { name: "CRM Migration", category: "Content", description: "Migrating customer records and playbooks to the new CRM, including data cleanup, field mapping and training.", members: ["AJ"], owner: "Alice Johnson", initials: "AJ", star: "410", fork: "88", contributor: "9", updated: "1 week ago" },
  { name: "API v2 Launch", category: "Engineering", description: "Version 2 of the public API with predictable versioning, improved rate limits, webhooks and richer docs.", members: ["DB", "BS"], owner: "Dan Brown", initials: "DB", star: "1.8k", fork: "460", contributor: "27", updated: "4 days ago" },
  { name: "Design System Tokens", category: "Design", description: "Centralizing color, spacing and type tokens into a single source of truth consumed by every frontend.", members: ["ED", "AJ", "BS"], owner: "Eve Davis", initials: "ED", star: "980", fork: "240", contributor: "16", updated: "6 hours ago" },
  { name: "Search & Discovery", category: "Growth", description: "Improving search relevance and on-site discovery with autocomplete, filters and personalized results.", members: ["CW", "DB", "ED"], owner: "Carol White", initials: "CW", star: "760", fork: "175", contributor: "14", updated: "2 days ago" },
]

const authors = ["Alice Johnson", "Bob Smith", "Carol White", "Dan Brown", "Eve Davis"]

export default function SearchProjectsPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [author, setAuthor] = useState<string>("")
  const [rating, setRating] = useState<string>("")

  const toggleCategory = (c: string) =>
    setSelectedCategories((prev) => prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c])

  const filtered = projects.filter((p) => {
    if (selectedCategories.length && !selectedCategories.includes(p.category)) return false
    if (author && p.owner !== author) return false
    const stars = parseInt(p.star, 10)
    if (rating === "excellent" && stars < 1500) return false
    if (rating === "good" && stars < 800) return false
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
            <SelectTrigger className="w-40" aria-label="Author">
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
            No projects match your filters.
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((p, i) => {
            const cover = covers[i % covers.length]
            const color = memberColors[i % memberColors.length]
            return (
            <Card key={p.name} size="sm" className="bg-card card-original shadow-sm overflow-hidden hover:shadow-md transition-shadow [--card-spacing:12px]!">
              <div className={`h-20 bg-gradient-to-br ${cover}`}>
                <div className="h-full w-full bg-card/30 flex items-center justify-between px-4">
                  <span className="text-xs font-semibold text-foreground/80">{p.category}</span>
                  <span className={`size-8 rounded-lg flex items-center justify-center text-[10px] font-bold ${color}`}>
                    {p.initials}
                  </span>
                </div>
              </div>
              <CardContent className="px-4">
                <a href="#" onClick={(e) => e.preventDefault()} className="text-sm font-semibold hover:text-primary transition-colors">
                  {p.name}
                </a>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed line-clamp-2 min-h-10">
                  {p.description}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{p.updated}</span>
                  <div className="flex -space-x-1.5">
                    {p.members.slice(0, 4).map((m, mi) => (
                      <span
                        key={mi}
                        className={`size-5 rounded-full ring-2 ring-card flex items-center justify-center text-[8px] font-bold ${memberColors[mi % memberColors.length]}`}
                        title={m}
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground pt-3 border-t border-border/20">
                  <span className="flex items-center gap-1"><Star className="size-3.5 text-amber-500 fill-amber-500" />{p.star}</span>
                  <span className="flex items-center gap-1"><GitBranch className="size-3.5" />{p.fork}</span>
                  <span className="flex items-center gap-1"><Users className="size-3.5" />{p.contributor}</span>
                </div>
              </CardContent>
            </Card>
            )
          })}
        </div>
      )}
    </SearchListShell>
  )
}
