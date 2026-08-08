"use client"

import { useState } from "react"
import { Star, ThumbsUp, MessageSquare, Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SearchListShell } from "@/components/sections/search-list"
import { SearchFilters } from "@/components/sections/search-filters"
import { cn } from "@/lib/utils"

type Article = {
  id: number
  title: string
  content: string
  owner: string
  initials: string
  color: string
  category: string
  tags: string[]
  star: number
  like: number
  message: number
  updatedAt: string
  href: string
}

const categories = ["Design", "Engineering", "Growth", "Content", "Research"]

const owners = [
  { name: "Alice Johnson", initials: "AJ" },
  { name: "Bob Smith", initials: "BS" },
  { name: "Carol White", initials: "CW" },
  { name: "Dan Brown", initials: "DB" },
  { name: "Eve Davis", initials: "ED" },
]

const avatarColors = ["bg-primary/15 text-primary", "bg-sky-500/15 text-sky-500", "bg-amber-500/15 text-amber-500", "bg-emerald-500/15 text-emerald-500", "bg-rose-500/15 text-rose-500"]

const seed: Omit<Article, "id" | "color">[] = [
  { title: "Scaling the checkout service for peak season", content: "How we load-tested the payment pipeline to 3× our projected Black Friday traffic and kept p99 latency under 400ms.", owner: "Alice Johnson", initials: "AJ", category: "Engineering", tags: ["Backend", "SRE"], star: 321, like: 124, message: 56, updatedAt: "2026-08-02 09:14", href: "mycogen.com/blog/checkout-scaling" },
  { title: "Design tokens: from Figma to code without drift", content: "A pipeline that exports design tokens straight from Figma into CSS variables, keeping design and engineering in lockstep.", owner: "Eve Davis", initials: "ED", category: "Design", tags: ["Design system", "Figma"], star: 210, like: 88, message: 34, updatedAt: "2026-07-28 16:40", href: "mycogen.com/blog/design-tokens" },
  { title: "How we cut bundle size by 40%", content: "Code-splitting, tree-shaking audits and replacing heavy dependencies — the full playbook behind a 187KB reduction.", owner: "Bob Smith", initials: "BS", category: "Engineering", tags: ["Frontend", "Perf"], star: 452, like: 190, message: 73, updatedAt: "2026-07-20 11:05", href: "mycogen.com/blog/bundle-size" },
  { title: "Running A/B tests that actually decide", content: "Everything we learned from 200+ experiments: how to size samples, avoid novelty effects and ship the winner fast.", owner: "Carol White", initials: "CW", category: "Growth", tags: ["Experiments", "Analytics"], star: 188, like: 96, message: 41, updatedAt: "2026-07-12 14:22", href: "mycogen.com/blog/ab-tests" },
  { title: "Postmortem: the API rate-limit incident", content: "A 47-minute partial outage, its root cause, and the six changes we made so it never happens again.", owner: "Dan Brown", initials: "DB", category: "Engineering", tags: ["Postmortem", "API"], star: 512, like: 240, message: 128, updatedAt: "2026-07-03 08:50", href: "mycogen.com/blog/rate-limit-incident" },
  { title: "Building a token-based design system", content: "Why we moved from ad-hoc color usage to semantic tokens, and the migration guide for the rest of the org.", owner: "Eve Davis", initials: "ED", category: "Design", tags: ["Design system"], star: 264, like: 121, message: 38, updatedAt: "2026-06-25 10:30", href: "mycogen.com/blog/token-system" },
  { title: "Customer research at scale", content: "How we synthesized 400 support tickets and 32 interviews into a roadmap that users actually asked for.", owner: "Carol White", initials: "CW", category: "Research", tags: ["UX research", "Roadmap"], star: 145, like: 67, message: 22, updatedAt: "2026-06-18 15:12", href: "mycogen.com/blog/customer-research" },
  { title: "Migrating our docs to the static generator", content: "Search indexing, redirects and versioning — the boring but vital work of moving 1,200 pages without breaking links.", owner: "Alice Johnson", initials: "AJ", category: "Content", tags: ["Docs", "Migration"], star: 98, like: 45, message: 19, updatedAt: "2026-06-10 09:00", href: "mycogen.com/blog/docs-migration" },
  { title: "Realtime dashboards with WebSockets", content: "Pushing live metrics to the frontend without melting the browser — batching, backpressure and reconnect logic.", owner: "Bob Smith", initials: "BS", category: "Engineering", tags: ["Realtime", "WebSockets"], star: 236, like: 103, message: 47, updatedAt: "2026-05-30 13:45", href: "mycogen.com/blog/realtime-dashboards" },
  { title: "A framework for pricing experiments", content: "Setting guardrails and success metrics so pricing tests don't sacrifice long-term revenue for short-term lifts.", owner: "Carol White", initials: "CW", category: "Growth", tags: ["Pricing", "Experiments"], star: 173, like: 82, message: 29, updatedAt: "2026-05-21 17:08", href: "mycogen.com/blog/pricing-experiments" },
  { title: "Accessibility is a spec, not a checklist", content: "Embedding a11y into the definition of done — keyboard nav, focus management and screen-reader stories.", owner: "Eve Davis", initials: "ED", category: "Design", tags: ["A11y", "Design system"], star: 289, like: 134, message: 61, updatedAt: "2026-05-14 11:26", href: "mycogen.com/blog/a11y-spec" },
  { title: "The anatomy of a slow query", content: "A guided tour from EXPLAIN output to a 40× faster query, with the indexes and schema changes we applied.", owner: "Dan Brown", initials: "DB", category: "Engineering", tags: ["Databases", "Perf"], star: 341, like: 155, message: 84, updatedAt: "2026-05-06 10:15", href: "mycogen.com/blog/slow-query" },
  { title: "Writing release notes people read", content: "A simple format for changelogs that respects your users' time and celebrates the work behind the scenes.", owner: "Alice Johnson", initials: "AJ", category: "Content", tags: ["Writing", "Changelog"], star: 87, like: 41, message: 15, updatedAt: "2026-04-28 12:40", href: "mycogen.com/blog/release-notes" },
  { title: "Multi-region failover, tested monthly", content: "Chaos drills on a schedule — simulating region loss so that when it really happens, nobody panics.", owner: "Bob Smith", initials: "BS", category: "Engineering", tags: ["SRE", "Resilience"], star: 205, like: 97, message: 33, updatedAt: "2026-04-20 09:55", href: "mycogen.com/blog/multi-region" },
  { title: "From wireframes to production UI in a week", content: "The tight collaboration loop between design and engineering that shipped our new onboarding in five days.", owner: "Eve Davis", initials: "ED", category: "Design", tags: ["Process", "Onboarding"], star: 168, like: 74, message: 26, updatedAt: "2026-04-12 16:30", href: "mycogen.com/blog/wireframes-to-prod" },
]

const articles: Article[] = seed.map((a, i) => ({
  ...a,
  id: i + 1,
  color: avatarColors[i % avatarColors.length],
}))

const pageSize = 5

export default function SearchArticlesPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedOwners, setSelectedOwners] = useState<string[]>([])
  const [onlyMine, setOnlyMine] = useState(false)
  const [activeUser, setActiveUser] = useState<string>("")
  const [rating, setRating] = useState<string>("")
  const [visible, setVisible] = useState(pageSize)
  const [loadingMore, setLoadingMore] = useState(false)

  const toggleCategory = (c: string) =>
    setSelectedCategories((prev) => prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c])

  const toggleOwner = (o: string) =>
    setSelectedOwners((prev) => prev.includes(o) ? prev.filter((x) => x !== o) : [...prev, o])

  const filtered = articles.filter((a) => {
    if (selectedCategories.length && !selectedCategories.includes(a.category)) return false
    if (selectedOwners.length && !selectedOwners.includes(a.owner)) return false
    if (onlyMine && a.owner !== "Alice Johnson") return false
    if (activeUser && a.owner !== activeUser) return false
    if (rating === "good" && a.like < 150) return false
    if (rating === "excellent" && a.like < 200) return false
    return true
  })

  const shown = filtered.slice(0, visible)
  const hasMore = visible < filtered.length

  const loadMore = () => {
    setLoadingMore(true)
    setTimeout(() => {
      setVisible((v) => v + pageSize)
      setLoadingMore(false)
    }, 600)
  }

  return (
    <SearchListShell>
      <SearchFilters
        categories={categories}
        selectedCategories={selectedCategories}
        onToggleCategory={toggleCategory}
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">Owner</span>
          <div className="flex flex-wrap items-center gap-1.5">
            {owners.map((o) => (
              <Button
                key={o.name}
                size="xs"
                variant={selectedOwners.includes(o.name) ? "default" : "outline"}
                onClick={() => toggleOwner(o.name)}
              >
                {o.name}
              </Button>
            ))}
            <Button
              size="xs"
              variant={onlyMine ? "secondary" : "ghost"}
              onClick={() => setOnlyMine(!onlyMine)}
              className={onlyMine ? "text-primary" : ""}
            >
              Only mine
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">Active user</span>
          <Select value={activeUser || undefined} onValueChange={(v) => setActiveUser(v ?? "")}>
            <SelectTrigger className="w-36" aria-label="Active user">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Alice Johnson">Alice Johnson</SelectItem>
              <SelectItem value="Bob Smith">Bob Smith</SelectItem>
              <SelectItem value="Carol White">Carol White</SelectItem>
              <SelectItem value="Eve Davis">Eve Davis</SelectItem>
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
              <SelectItem value="good">Good</SelectItem>
              <SelectItem value="excellent">Excellent</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </SearchFilters>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardContent className="p-0">
          <div className="divide-y divide-border/30">
            {shown.length === 0 && (
              <div className="px-6 py-12 text-center text-sm text-muted-foreground">
                No articles match your filters.
              </div>
            )}
            {shown.map((a) => (
              <div key={a.id} className="px-5 py-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <a href="#" onClick={(e) => e.preventDefault()} className="text-base font-semibold hover:text-primary transition-colors leading-snug">
                    {a.title}
                  </a>
                  <Badge variant="outline" className="text-[10px] font-medium px-1.5 py-0 rounded-full shrink-0">{a.category}</Badge>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {a.tags.map((t) => (
                    <Badge key={t} className="text-[10px] font-medium px-1.5 py-0 rounded-full bg-primary/10 text-primary">{t}</Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed line-clamp-2">{a.content}</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className={`size-5 rounded-full flex items-center justify-center text-[9px] font-bold ${a.color}`}>{a.initials}</span>
                  <a href="#" onClick={(e) => e.preventDefault()} className="font-medium text-foreground hover:text-primary">{a.owner}</a>
                  <span>posted in</span>
                  <a href="#" onClick={(e) => e.preventDefault()} className="text-primary">{a.href}</a>
                  <span className="ml-auto">{a.updatedAt}</span>
                </div>
                <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Star className="size-3.5 text-amber-500 fill-amber-500" />{a.star}</span>
                  <span className="flex items-center gap-1"><ThumbsUp className="size-3.5" />{a.like}</span>
                  <span className="flex items-center gap-1"><MessageSquare className="size-3.5" />{a.message}</span>
                </div>
              </div>
            ))}
          </div>
          {hasMore && (
            <div className="flex justify-center py-4 border-t border-border/20">
              <Button variant="outline" onClick={loadMore} disabled={loadingMore} className="px-8">
                {loadingMore ? <Loader2 className="size-4 animate-spin" /> : null}
                {loadingMore ? "Loading..." : "Load more"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </SearchListShell>
  )
}
