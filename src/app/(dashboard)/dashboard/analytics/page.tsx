"use client"

import { useState } from "react"
import { Users, Eye, TrendingDown, Clock, ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardAction } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const kpis = [
  { title: "Unique Visitors", value: "24.7K", change: "+20%", icon: Users, up: true },
  { title: "Total Pageviews", value: "55.9K", change: "+4%", icon: Eye, up: true },
  { title: "Bounce Rate", value: "54%", change: "-1.59%", icon: TrendingDown, up: false },
  { title: "Visit Duration", value: "2m 56s", change: "+7%", icon: Clock, up: true },
]

const salesData = [
  { name: "Mon", sales: 1200 }, { name: "Tue", sales: 1800 }, { name: "Wed", sales: 1500 },
  { name: "Thu", sales: 2200 }, { name: "Fri", sales: 2800 }, { name: "Sat", sales: 2400 },
  { name: "Sun", sales: 3100 },
]

const channels = [
  { name: "Organic Search", visitors: "18,420", pct: 42 },
  { name: "Direct", visitors: "12,350", pct: 28 },
  { name: "Social Media", visitors: "8,910", pct: 20 },
  { name: "Referral", visitors: "4,220", pct: 10 },
]

const topPages = [
  { name: "/products", views: "12,450" }, { name: "/pricing", views: "8,920" },
  { name: "/blog", views: "6,780" }, { name: "/about", views: "4,230" },
  { name: "/contact", views: "2,890" },
]

const activeStats = [
  { label: "Live Visitors", value: "364" }, { label: "Avg. Daily", value: "224" },
  { label: "Avg. Weekly", value: "1.4K" }, { label: "Avg. Monthly", value: "22.1K" },
]

const acqChannels = [
  { name: "Organic", pct: 40, color: "#3b82f6" }, { name: "Direct", pct: 25, color: "#8b5cf6" },
  { name: "Social", pct: 20, color: "#10b981" }, { name: "Referral", pct: 10, color: "#f59e0b" },
  { name: "Other", pct: 5, color: "#6b7280" },
]

const countries = [
  { name: "USA", code: "US", visitors: "8,420", pct: 38 },
  { name: "UK", code: "GB", visitors: "4,210", pct: 19 },
  { name: "Germany", code: "DE", visitors: "3,580", pct: 16 },
  { name: "France", code: "FR", visitors: "2,910", pct: 13 },
]

const orders = [
  { id: "#ORD-001", customer: "Alice Johnson", status: "Completed", amount: "$125.00" },
  { id: "#ORD-002", customer: "Bob Smith", status: "Processing", amount: "$89.00" },
  { id: "#ORD-003", customer: "Carol White", status: "Completed", amount: "$210.00" },
  { id: "#ORD-004", customer: "David Brown", status: "Pending", amount: "$54.00" },
]

const grad = acqChannels.map((c, i, a) => {
  const start = a.slice(0, i).reduce((s, x) => s + x.pct, 0)
  return `${c.color} ${start}% ${start + c.pct}%`
}).join(", ")

const statusVariant: Record<string, "default" | "secondary" | "outline"> = {
  Completed: "default", Processing: "secondary", Pending: "outline",
}

export default function AnalyticsPage() {
  const [t, setT] = useState<{ x: number; y: number; text: string } | null>(null)
  const mv = Math.max(...salesData.map(d => d.sales))

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">Deep dive into your metrics and performance.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k, i) => {
          const Icon = k.icon
          return (
            <Card key={i} size="sm" className="bg-card card-original shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{k.title}</CardTitle>
                <Icon className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tracking-tight">{k.value}</div>
                <span className={`text-xs font-medium ${k.up ? "text-emerald-500" : "text-red-500"}`}>{k.change}</span>
                <span className="text-xs text-muted-foreground ml-1">vs last period</span>
              </CardContent>
            </Card>
          )
        })}
      </div>
      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Sales Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative h-48">
            <svg viewBox="0 0 600 180" preserveAspectRatio="xMidYMid meet" className="w-full h-full">
              {[0, 1, 2, 3].map(i => {
                const y = 15 + (150 / 4) * i
                return (
                  <g key={i}>
                    <line x1="50" y1={y} x2="580" y2={y} className="stroke-border/40" strokeWidth="1" />
                    <text x="44" y={y + 4} textAnchor="end" className="fill-muted-foreground" fontSize="11">${((mv / 4) * (4 - i) / 1000).toFixed(0)}k</text>
                  </g>
                )
              })}
              {salesData.map((d, i) => {
                const x = 50 + (530 / salesData.length) * i + 8
                const bh = (d.sales / mv) * 150
                const y = 15 + 150 - bh
                return (
                  <g key={d.name}>
                    <rect x={x} y={y} width={530 / salesData.length - 16} height={bh} rx="3"
                      className="fill-primary/70 hover:fill-primary cursor-pointer transition-colors"
                      onMouseEnter={(e) => {
                        const r = (e.target as SVGElement).closest("svg")!.getBoundingClientRect()
                        setT({ x: r.left + x + 40, y: r.top + y - 8, text: `${d.name}: $${d.sales.toLocaleString()}` })
                      }}
                      onMouseLeave={() => setT(null)} />
                    <text x={x + (530 / salesData.length - 16) / 2} y={178} textAnchor="middle" className="fill-muted-foreground" fontSize="11">{d.name}</text>
                  </g>
                )
              })}
            </svg>
            {t && (
              <div className="absolute pointer-events-none bg-card border border-border rounded-lg px-3 py-1.5 text-sm shadow-md z-10"
                style={{ left: t.x - 80, top: t.y - 36 }}>
                {t.text}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card size="sm" className="bg-card card-original shadow-sm">
          <CardHeader>
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Top Channels</CardTitle>
            <CardAction>
              <Button variant="ghost" size="xs"><ExternalLink className="size-3" /></Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {channels.map(c => (
                <div key={c.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{c.name}</span>
                    <span className="text-xs text-muted-foreground">{c.visitors}</span>
                  </div>
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary/70 rounded-full" style={{ width: `${c.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card size="sm" className="bg-card card-original shadow-sm">
          <CardHeader>
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Top Pages</CardTitle>
            <CardAction>
              <Button variant="ghost" size="xs"><ExternalLink className="size-3" /></Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topPages.map((p, i) => (
                <div key={p.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground w-4">{i + 1}.</span>
                    <span className="text-sm font-mono text-primary">{p.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{p.views}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card size="sm" className="bg-card card-original shadow-sm">
          <CardHeader>
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Active Users</CardTitle>
            <CardAction>
              <Button variant="ghost" size="xs"><ExternalLink className="size-3" /></Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {activeStats.map(s => (
                <div key={s.label}>
                  <div className="text-2xl font-bold tracking-tight">{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card size="sm" className="bg-card card-original shadow-sm">
          <CardHeader>
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Acquisition Channels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="size-28 rounded-full shrink-0" style={{ background: `conic-gradient(${grad})` }} />
              <div className="space-y-2 flex-1">
                {acqChannels.map(c => (
                  <div key={c.name} className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5">
                      <span className="size-2 rounded-full inline-block" style={{ backgroundColor: c.color }} />
                      {c.name}
                    </span>
                    <span className="text-muted-foreground">{c.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card size="sm" className="bg-card card-original shadow-sm">
          <CardHeader>
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Customers Demographic</CardTitle>
            <CardAction>
              <Button variant="ghost" size="xs"><ExternalLink className="size-3" /></Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {countries.map(c => (
                <div key={c.code} className="flex items-center gap-3">
                  <div className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                    {c.code}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{c.name}</span>
                      <span className="text-xs text-muted-foreground">{c.visitors}</span>
                    </div>
                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary/70 rounded-full" style={{ width: `${c.pct}%` }} />
                    </div>
                  </div>
                  <span className="text-xs font-medium text-muted-foreground shrink-0 w-8 text-right">{c.pct}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card size="sm" className="bg-card card-original shadow-sm">
          <CardHeader>
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/30">
                  <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-(--card-spacing) py-2">Order</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-(--card-spacing) py-2">Customer</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-(--card-spacing) py-2">Status</th>
                  <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider px-(--card-spacing) py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id} className="border-b border-border/20 last:border-0">
                    <td className="px-(--card-spacing) py-2.5 font-medium">{o.id}</td>
                    <td className="px-(--card-spacing) py-2.5 text-muted-foreground">{o.customer}</td>
                    <td className="px-(--card-spacing) py-2.5">
                      <Badge variant={statusVariant[o.status]}>{o.status}</Badge>
                    </td>
                    <td className="px-(--card-spacing) py-2.5 text-right font-medium">{o.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
