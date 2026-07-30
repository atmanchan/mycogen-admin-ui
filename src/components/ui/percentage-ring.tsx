"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface PercentageRingProps {
  percentage: number
  label: string
  subLabel?: string
  change?: number
}

export function PercentageRing({ percentage, label, subLabel, change }: PercentageRingProps) {
  const r = 40
  const circ = 2 * Math.PI * r
  const offset = circ - (percentage / 100) * circ

  return (
    <Card size="sm" className="bg-card card-tight shadow-sm">
      <CardHeader>
        <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center py-2">
          <div className="relative h-24 w-24">
            <svg className="h-24 w-24 -rotate-90" viewBox="0 0 100 100">
              <circle className="stroke-muted" cx="50" cy="50" r={r} fill="none" strokeWidth="8" />
              <circle
                cx="50" cy="50" r={r} fill="none" strokeWidth="8"
                stroke="hsl(var(--primary))"
                strokeDasharray={circ}
                strokeDashoffset={offset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold">{percentage}%</span>
            </div>
          </div>
          {change !== undefined && (
            <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
              <span className={cn("font-medium", change > 0 ? "text-success" : "text-destructive")}>
                {change > 0 ? "+" : ""}{change}%
              </span>
              <span>from last month</span>
            </div>
          )}
          {subLabel && <p className="text-xs text-muted-foreground mt-1">{subLabel}</p>}
        </div>
      </CardContent>
    </Card>
  )
}
