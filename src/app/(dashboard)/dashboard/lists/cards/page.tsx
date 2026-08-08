"use client"

import { useState } from "react"
import { Download, Pencil, Plus, Share2, Star, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreMenu } from "@/components/sections/more-menu"

const seedApps = [
  { name: "Ant Design Pro", desc: "Out-of-the-box admin template with a design system you can trust.", color: "bg-primary/15 text-primary", initial: "A", stars: "4.9k", tags: ["Admin", "React"] },
  { name: "Recharts", desc: "A composable charting library built on React components.", color: "bg-sky-500/15 text-sky-500", initial: "R", stars: "22k", tags: ["Charts", "Data viz"] },
  { name: "Mycogen UI", desc: "The design system powering this very dashboard, token-driven and glass-inspired.", color: "bg-violet-500/15 text-violet-500", initial: "M", stars: "1.2k", tags: ["Design system"] },
  { name: "Base UI", desc: "Headless, accessible React primitives for building your own component library.", color: "bg-emerald-500/15 text-emerald-500", initial: "B", stars: "8.4k", tags: ["Headless", "A11y"] },
  { name: "Tailwind CSS", desc: "A utility-first CSS framework for rapidly building custom interfaces.", color: "bg-cyan-500/15 text-cyan-500", initial: "T", stars: "76k", tags: ["CSS", "Styling"] },
  { name: "Dnd Kit", desc: "Lightweight, performant, accessible drag-and-drop for React.", color: "bg-amber-500/15 text-amber-500", initial: "D", stars: "12k", tags: ["DnD", "React"] },
  { name: "Lodash", desc: "A modern JavaScript utility library delivering modularity and performance.", color: "bg-rose-500/15 text-rose-500", initial: "L", stars: "58k", tags: ["Utils"] },
  { name: "Zustand", desc: "A small, fast and scalable state management solution for React.", color: "bg-indigo-500/15 text-indigo-500", initial: "Z", stars: "44k", tags: ["State"] },
]

export default function CardListPage() {
  const [apps, setApps] = useState(seedApps)

  const removeCard = (name: string) => setApps((prev) => prev.filter((a) => a.name !== name))

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Card List</h1>
        <p className="text-sm text-muted-foreground mt-1">
          A responsive grid of application cards.
        </p>
      </div>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Applications
            </CardTitle>
            <Button size="sm"><Plus className="size-3.5" /> Add Application</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <button className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border/60 text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors min-h-40 cursor-pointer">
              <span className="size-10 rounded-full bg-muted flex items-center justify-center">
                <Plus className="size-5" />
              </span>
              <span className="text-sm font-medium">New Application</span>
            </button>

            {apps.map((a) => (
              <div key={a.name} className="rounded-xl border border-border/40 p-4 hover:border-primary/40 hover:shadow-sm transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className={`size-10 rounded-lg flex items-center justify-center text-sm font-bold ${a.color}`}>
                      {a.initial}
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{a.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Star className="size-3 text-amber-500 fill-amber-500" /> {a.stars}
                      </p>
                    </div>
                  </div>
                  <MoreMenu
                    label={`Actions for ${a.name}`}
                    items={[
                      { label: "Edit", icon: Pencil },
                      { label: "Share", icon: Share2 },
                      { label: "Delete", icon: Trash2, variant: "destructive", onClick: () => removeCard(a.name) },
                    ]}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-3 line-clamp-2 leading-relaxed">{a.desc}</p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex gap-1.5 flex-wrap">
                    {a.tags.map((t) => (
                      <Badge key={t} variant="outline" className="text-[10px] font-medium px-1.5 py-0 rounded-full">{t}</Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon-xs" aria-label={`Download ${a.name}`}><Download className="size-3.5" /></Button>
                    <Button variant="ghost" size="icon-xs" aria-label={`Share ${a.name}`}><Share2 className="size-3.5" /></Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
