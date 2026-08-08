"use client"

import { useState } from "react"
import { CheckCircle2, Copy } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

const specs = [
  { key: "Service name", value: "checkout-service" },
  { key: "Region", value: "us-east-1" },
  { key: "Deploy strategy", value: "Blue/green" },
  { key: "Node size", value: "c6g.xlarge × 12" },
  { key: "Auto-scaling", value: "Enabled (2–20)" },
  { key: "Health check", value: "/healthz · 15s interval" },
]

const envVars = [
  { key: "PAYMENT_GATEWAY_URL", value: "https://payments.internal:8443" },
  { key: "RATE_LIMIT_RPM", value: "1200" },
  { key: "CACHE_TTL_SECONDS", value: "300" },
  { key: "FEATURE_FLAG_ROLLOUT", value: "0.15" },
]

const revisions = [
  { id: "r42", msg: "Fix checkout timeout backoff", author: "Alice Johnson", time: "Aug 5 · 11:02" },
  { id: "r41", msg: "Bump gateway client to 2.4.1", author: "Bob Smith", time: "Aug 4 · 16:40" },
  { id: "r40", msg: "Add idempotency key validation", author: "Carol White", time: "Aug 3 · 09:15" },
  { id: "r39", msg: "Reduce log noise on retries", author: "Dan Brown", time: "Aug 1 · 18:22" },
]

const members = [
  { name: "Alice Johnson", role: "Owner", color: "bg-primary/15 text-primary" },
  { name: "Bob Smith", role: "Maintainer", color: "bg-sky-500/15 text-sky-500" },
  { name: "Carol White", role: "Developer", color: "bg-amber-500/15 text-amber-500" },
  { name: "Dan Brown", role: "Viewer", color: "bg-emerald-500/15 text-emerald-500" },
]

const tabItems = [
  { value: "spec", label: "Specification" },
  { value: "env", label: "Environment" },
  { value: "revisions", label: "Revisions" },
  { value: "members", label: "Members" },
]

export default function ProfileAdvancedPage() {
  const [value, setValue] = useState("spec")

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Advanced Profile</h1>
        <p className="text-sm text-muted-foreground mt-1">
          A tabbed service detail with specs, environment, revisions and members.
        </p>
      </div>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="size-10 rounded-lg bg-primary/12 text-primary flex items-center justify-center text-sm font-bold">C</span>
              <div>
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  checkout-service
                  <Button variant="ghost" size="icon-xs" aria-label="Copy service name"><Copy className="size-3.5" /></Button>
                </CardTitle>
                <p className="text-xs text-muted-foreground">Last deployed Aug 5, 2026 · 11:02</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-success/10 text-success gap-1.5"><CheckCircle2 className="size-3" /> Healthy</Badge>
              <Button size="sm">Deploy</Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardContent className="p-0">
          <div className="px-4 pt-3">
            <Tabs value={value} onValueChange={setValue}>
              <TabsList variant="line">
                {tabItems.map((t) => (
                  <TabsTrigger key={t.value} value={t.value}>{t.label}</TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
          <div className="px-4 pb-4 pt-2">
            {value === "spec" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-3 pt-2">
                {specs.map((s) => (
                  <div key={s.key}>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">{s.key}</div>
                    <div className="text-sm font-medium mt-0.5">{s.value}</div>
                  </div>
                ))}
              </div>
            )}
            {value === "env" && (
              <div className="overflow-x-auto pt-2">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/40 text-left text-xs text-muted-foreground uppercase tracking-wider">
                      <th className="px-4 py-3 font-medium">Key</th>
                      <th className="px-4 py-3 font-medium">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {envVars.map((v) => (
                      <tr key={v.key} className="border-b border-border/30 last:border-0">
                        <td className="px-4 py-2.5 font-mono text-xs">{v.key}</td>
                        <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{v.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {value === "revisions" && (
              <div className="divide-y divide-border/30 pt-1">
                {revisions.map((r) => (
                  <div key={r.id} className="flex items-center gap-3 py-2.5 hover:bg-muted/30 transition-colors rounded-md">
                    <span className="font-mono text-xs text-primary shrink-0">{r.id}</span>
                    <p className="text-sm flex-1 min-w-0 truncate">{r.msg}</p>
                    <span className="text-xs text-muted-foreground shrink-0">{r.author}</span>
                    <span className="text-xs text-muted-foreground shrink-0 w-28 text-right">{r.time}</span>
                  </div>
                ))}
              </div>
            )}
            {value === "members" && (
              <div className="divide-y divide-border/30 pt-1">
                {members.map((m) => (
                  <div key={m.name} className="flex items-center gap-3 py-2.5 hover:bg-muted/30 transition-colors rounded-md">
                    <span className={`size-8 rounded-full flex items-center justify-center text-xs font-bold ${m.color}`}>
                      {m.name.split(" ").map((w) => w[0]).join("")}
                    </span>
                    <span className="text-sm font-medium flex-1">{m.name}</span>
                    <Badge variant="outline" className="text-[10px] font-medium px-1.5 py-0 rounded-full">{m.role}</Badge>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
