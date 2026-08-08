"use client"

import { useEffect, useMemo, useState } from "react"
import { Activity, Server, AlertTriangle, Wifi, Cpu, HardDrive } from "lucide-react"
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MetricCard } from "@/components/ui/metric-card"
import { PercentageRing } from "@/components/ui/percentage-ring"

const now = new Date()

function genTraffic() {
  return Array.from({ length: 40 }, (_, i) => ({
    time: `${String(i).padStart(2, "0")}:00`,
    traffic: 80 + Math.round(Math.sin(i / 3) * 60 + Math.random() * 40),
    requests: 40 + Math.round(Math.cos(i / 2.5) * 35 + Math.random() * 30),
  }))
}

const initialTraffic = genTraffic()

const exceptions = [
  { time: "10:24:15", level: "Critical" as const, service: "checkout-service", message: "Timeout after 30s connecting to payment gateway" },
  { time: "10:18:42", level: "Error" as const, service: "auth-service", message: "Rate limit exceeded for IP 185.220.101.4" },
  { time: "09:57:03", level: "Error" as const, service: "inventory-service", message: "Stock reservation failed for SKU #4421" },
  { time: "09:41:27", level: "Warning" as const, service: "api-gateway", message: "High latency detected on /v1/orders" },
  { time: "09:12:58", level: "Warning" as const, service: "search-service", message: "Reindex queue backlog above threshold" },
  { time: "08:50:11", level: "Error" as const, service: "email-service", message: "SES quota at 92%, send deferred" },
]

const services = [
  { name: "checkout-service", nodes: 12, health: 98.4, cpu: 42, mem: 61, status: "Healthy" as const },
  { name: "auth-service", nodes: 8, health: 99.1, cpu: 35, mem: 48, status: "Healthy" as const },
  { name: "inventory-service", nodes: 6, health: 97.6, cpu: 58, mem: 72, status: "Healthy" as const },
  { name: "search-service", nodes: 4, health: 96.8, cpu: 66, mem: 79, status: "Degraded" as const },
  { name: "email-service", nodes: 3, health: 95.2, cpu: 47, mem: 64, status: "Degraded" as const },
]

const levelStyles: Record<string, string> = {
  Critical: "bg-destructive text-destructive",
  Error: "bg-warning/15 text-warning",
  Warning: "bg-primary/10 text-primary",
}

export default function MonitorPage() {
  const [traffic, setTraffic] = useState(initialTraffic)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setTraffic((prev) => [
        ...prev.slice(1),
        {
          time: `:${String(new Date().getSeconds()).padStart(2, "0")}`,
          traffic: 80 + Math.round(Math.sin(Date.now() / 900) * 60 + Math.random() * 40),
          requests: 40 + Math.round(Math.cos(Date.now() / 700) * 35 + Math.random() * 30),
        },
      ])
    }, 2000)
    return () => clearInterval(id)
  }, [paused])

  const cpuUse = useMemo(() => 42 + Math.round(Math.sin(now.getMinutes() / 3) * 8), [])
  const memUse = useMemo(() => 61 + Math.round(Math.cos(now.getMinutes() / 4) * 5), [])

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Monitor</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time system health, traffic and service status.
          </p>
        </div>
        <Badge variant="outline" className="text-xs gap-1.5 px-2.5 py-1">
          <span className="size-1.5 rounded-full bg-success animate-pulse" />
          All systems operational
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Total Activity" value="24,480" change={12} icon={Activity} subtitle="Events in the last 24h" />
        <MetricCard title="Live Users" value="1,382" change={8} icon={Wifi} subtitle="Across 33 services" />
        <MetricCard title="Exceptions" value="6" change={-18} trend="up" icon={AlertTriangle} subtitle="Last 24 hours" />
        <MetricCard title="Services" value="33" change={3} icon={Server} subtitle="12 healthy regions" />
      </div>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Traffic Trend
            </CardTitle>
            <button
              onClick={() => setPaused(!paused)}
              className="text-xs font-medium text-primary hover:underline cursor-pointer"
            >
              {paused ? "Resume" : "Pause"}
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={traffic} margin={{ top: 5, right: 8, bottom: 0, left: -18 }}>
                <defs>
                  <linearGradient id="trafficFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7c5cfc" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#7c5cfc" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="requestFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0891b2" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0891b2" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="time" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
                />
                <Area type="monotone" dataKey="traffic" name="Traffic" stroke="#7c5cfc" strokeWidth={2} fill="url(#trafficFill)" />
                <Area type="monotone" dataKey="requests" name="Requests" stroke="#0891b2" strokeWidth={2} fill="url(#requestFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <PercentageRing percentage={cpuUse} label="CPU Usage" change={2} subLabel="Across all nodes" />
        <PercentageRing percentage={memUse} label="Memory" change={-3} subLabel="P50 of active nodes" />
        <PercentageRing percentage={87} label="Storage" change={5} subLabel="3.1 TB of 3.6 TB used" />
        <PercentageRing percentage={99.98} label="Uptime" change={0.2} subLabel="Rolling 30-day" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card size="sm" className="bg-card card-original shadow-sm">
          <CardHeader>
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Service Health
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/40 text-left text-xs text-muted-foreground uppercase tracking-wider">
                    <th className="px-4 py-3 font-medium">Service</th>
                    <th className="px-4 py-3 font-medium">Nodes</th>
                    <th className="px-4 py-3 font-medium">CPU</th>
                    <th className="px-4 py-3 font-medium">Memory</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((s) => (
                    <tr key={s.name} className="border-b border-border/30 last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-medium">{s.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{s.nodes}</td>
                      <td className="px-4 py-3 text-muted-foreground">{s.cpu}%</td>
                      <td className="px-4 py-3 text-muted-foreground">{s.mem}%</td>
                      <td className="px-4 py-3">
                        <Badge className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                          s.status === "Healthy" ? "bg-success/10 text-success" : "bg-warning/15 text-warning"
                        }`}>
                          {s.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card size="sm" className="bg-card card-original shadow-sm">
          <CardHeader>
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Recent Exceptions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/30">
              {exceptions.map((e, i) => (
                <div key={i} className="flex items-start gap-3 px-4 py-2.5 hover:bg-muted/30 transition-colors">
                  <Badge className={`mt-0.5 text-[10px] font-semibold px-1.5 py-0 rounded shrink-0 ${levelStyles[e.level]}`}>
                    {e.level}
                  </Badge>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-foreground truncate">{e.message}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{e.service}</p>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0 font-mono">{e.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
