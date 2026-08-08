"use client"

import { ArrowUpRight, FileText, GitBranch, MessageSquare, Plus, Target, TrendingUp, Pencil, Share2, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MoreMenu } from "@/components/sections/more-menu"

const projects = [
  { name: "Checkout Redesign", owner: "AC", color: "bg-primary/15 text-primary", progress: 76, deadline: "Aug 20", priority: "High" as const },
  { name: "Mobile App v2", owner: "JS", color: "bg-sky-500/15 text-sky-500", progress: 52, deadline: "Sep 02", priority: "Medium" as const },
  { name: "Inventory Sync", owner: "ET", color: "bg-amber-500/15 text-amber-500", progress: 88, deadline: "Aug 14", priority: "High" as const },
  { name: "Analytics Portal", owner: "MK", color: "bg-emerald-500/15 text-emerald-500", progress: 34, deadline: "Oct 01", priority: "Medium" as const },
  { name: "CRM Migration", owner: "LS", color: "bg-rose-500/15 text-rose-500", progress: 12, deadline: "Nov 15", priority: "Low" as const },
  { name: "API v2 Launch", owner: "PV", color: "bg-violet-500/15 text-violet-500", progress: 63, deadline: "Sep 12", priority: "High" as const },
]

const members = [
  { name: "Alice Johnson", role: "Product Lead", initials: "AJ", color: "bg-primary/15 text-primary" },
  { name: "Bob Smith", role: "Frontend", initials: "BS", color: "bg-sky-500/15 text-sky-500" },
  { name: "Carol White", role: "Backend", initials: "CW", color: "bg-amber-500/15 text-amber-500" },
  { name: "Dan Brown", role: "QA", initials: "DB", color: "bg-emerald-500/15 text-emerald-500" },
  { name: "Eve Davis", role: "Design", initials: "ED", color: "bg-rose-500/15 text-rose-500" },
]

const activity = [
  { icon: GitBranch, color: "text-primary bg-primary/10", text: "Alice merged PR #482 into checkout-redesign", time: "10 min ago" },
  { icon: MessageSquare, color: "text-sky-500 bg-sky-500/10", text: "Bob commented on mobile-app-v2 design review", time: "42 min ago" },
  { icon: Target, color: "text-emerald-500 bg-emerald-500/10", text: "Carol completed sprint 14 planning", time: "2 hours ago" },
  { icon: FileText, color: "text-amber-500 bg-amber-500/10", text: "Eve published the new onboarding flow spec", time: "5 hours ago" },
  { icon: TrendingUp, color: "text-violet-500 bg-violet-500/10", text: "Dan posted weekly QA report #18", time: "Yesterday" },
]

const priorityStyles: Record<string, string> = {
  High: "bg-destructive/10 text-destructive",
  Medium: "bg-warning/15 text-warning",
  Low: "bg-muted text-muted-foreground",
}

export default function WorkplacePage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Workplace</h1>
        <p className="text-sm text-muted-foreground mt-1">
          A snapshot of your active projects, team and recent activity.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card size="sm" className="bg-card card-original shadow-sm xl:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Active Projects
              </CardTitle>
              <Button variant="ghost" size="xs"><Plus className="size-3.5" /> New Project</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((p) => (
                <div key={p.name} className="rounded-lg border border-border/40 p-3.5 hover:border-primary/40 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`size-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${p.color}`}>
                        {p.owner}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{p.name}</p>
                        <p className="text-xs text-muted-foreground">Due {p.deadline}</p>
                      </div>
                    </div>
                    <MoreMenu
                      label={`Actions for ${p.name}`}
                      items={[
                        { label: "Edit", icon: Pencil },
                        { label: "Share", icon: Share2 },
                        { label: "Delete", icon: Trash2, variant: "destructive" },
                      ]}
                    />
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary/70 rounded-full transition-all" style={{ width: `${p.progress}%` }} />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground w-8 text-right">{p.progress}%</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <Badge className={`text-[10px] font-semibold px-1.5 py-0 rounded-full ${priorityStyles[p.priority]}`}>
                      {p.priority}
                    </Badge>
                    <Button variant="ghost" size="xs"><ArrowUpRight className="size-3.5" /> View</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card size="sm" className="bg-card card-original shadow-sm">
            <CardHeader>
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Team Members
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {members.map((m) => (
                  <div key={m.name} className="flex items-center gap-1.5 rounded-full border border-border/40 pl-0.5 pr-2.5 py-0.5">
                    <Avatar className="size-6">
                      <AvatarFallback className={`text-[10px] font-bold ${m.color}`}>{m.initials}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-medium">{m.name.split(" ")[0]}</span>
                  </div>
                ))}
                <Button variant="outline" size="xs" className="rounded-full size-7 p-0">
                  <Plus className="size-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card size="sm" className="bg-card card-original shadow-sm">
            <CardHeader>
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/30">
                {activity.map((a, i) => (
                  <div key={i} className="flex items-start gap-3 px-4 py-2.5 hover:bg-muted/30 transition-colors">
                    <span className={`size-7 rounded-lg flex items-center justify-center shrink-0 ${a.color}`}>
                      <a.icon className="size-3.5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-foreground leading-snug">{a.text}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
