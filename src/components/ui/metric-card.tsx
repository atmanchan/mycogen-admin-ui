import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  icon?: LucideIcon
  trend?: "up" | "down"
  subtitle?: string
}

export function MetricCard({
  title, value, change, changeLabel = "this month",
  icon: Icon, trend = "up", subtitle,
}: MetricCardProps) {
  const isPositive = trend === "up"
  return (
    <Card size="sm" className="bg-card card-original shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between w-full">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{title}</span>
          {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold tracking-tight">{value}</div>
        {change !== undefined && (
          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
            <span className={cn("font-medium", isPositive ? "text-success" : "text-destructive")}>
              {isPositive ? "+" : ""}{change}%
            </span>
            <span>{changeLabel}</span>
          </p>
        )}
        {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
      </CardContent>
    </Card>
  )
}
