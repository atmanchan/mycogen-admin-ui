"use client"

import { useState } from "react"
import { ArrowRight, Clock, Edit, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

const allItems = [
  { title: "Design System Audit", desc: "Review token usage across the product and align spacing, type scale and color roles with the design spec.", owner: "AJ", tag: "Design", time: "Updated 2h ago" },
  { title: "Checkout Performance", desc: "Profile the checkout bundle, identify blocking resources and cut first-load time below 1.8s on 4G.", owner: "BS", tag: "Engineering", time: "Updated 5h ago" },
  { title: "Onboarding A/B Test", desc: "Run an A/B test on the new sign-up flow comparing conversion across three variants.", owner: "CW", tag: "Growth", time: "Updated 1d ago" },
  { title: "API Rate Limiting", desc: "Add per-key rate limiting to the public API and ship usage reporting to the dashboard.", owner: "DB", tag: "Engineering", time: "Updated 2d ago" },
  { title: "Brand Refresh", desc: "Update marketing collateral, logos and email templates to match the new brand guidelines.", owner: "ED", tag: "Design", time: "Updated 3d ago" },
  { title: "Customer NPS Survey", desc: "Design and launch a quarterly NPS survey to existing customers across all regions.", owner: "MK", tag: "Research", time: "Updated 5d ago" },
  { title: "Docs Site Migration", desc: "Move the documentation site to the new static generator and update all redirects.", owner: "LS", tag: "Content", time: "Updated 1w ago" },
]

const tagStyles: Record<string, string> = {
  Design: "bg-primary/10 text-primary",
  Engineering: "bg-sky-500/15 text-sky-500",
  Growth: "bg-emerald-500/15 text-emerald-500",
  Research: "bg-amber-500/15 text-amber-500",
  Content: "bg-rose-500/15 text-rose-500",
}

const perPage = 3

export default function BasicListPage() {
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(allItems.length / perPage)
  const items = allItems.slice((page - 1) * perPage, page * perPage)

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Basic List</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Standard list rows with owner, description and inline actions.
        </p>
      </div>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Work Items
            </CardTitle>
            <Button size="sm">+ New Item</Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border/30">
            {items.map((item) => (
              <div key={item.title} className="flex flex-col sm:flex-row sm:items-center gap-3 px-4 py-4 hover:bg-muted/30 transition-colors">
                <Avatar className="size-10 shrink-0">
                  <AvatarFallback className="bg-primary/12 text-primary text-xs font-bold">{item.owner}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold">{item.title}</span>
                    <Badge className={`text-[10px] font-semibold px-1.5 py-0 rounded-full ${tagStyles[item.tag]}`}>
                      {item.tag}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">{item.desc}</p>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <Clock className="size-3" /> {item.time}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Button variant="ghost" size="sm"><Eye className="size-3.5" /> View</Button>
                  <Button variant="ghost" size="sm"><Edit className="size-3.5" /> Edit</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, allItems.length)} of {allItems.length}
        </p>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); setPage(Math.max(1, page - 1)) }} text="Prev" />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <PaginationItem key={p}>
                <PaginationLink
                  href="#"
                  isActive={p === page}
                  onClick={(e) => { e.preventDefault(); setPage(p) }}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext href="#" onClick={(e) => { e.preventDefault(); setPage(Math.min(totalPages, page + 1)) }} text="Next" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
