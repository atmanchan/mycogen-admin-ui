import type { LucideIcon } from "lucide-react"

export interface MetricCardProps {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  icon?: LucideIcon
  trend?: "up" | "down"
  subtitle?: string
}

export interface InsightItem {
  label: string
  value: string | number
  subtext: string
}

export interface InsightData {
  title: string
  items: InsightItem[]
}

export interface RingData {
  percentage: number
  label: string
  change?: number
  subLabel?: string
}

export interface PromoData {
  id: number
  title: string
  description: string
  status: "Active" | "Live"
  icon: string
}

export interface KPIData extends MetricCardProps {}

export interface SalesDataPoint {
  name: string
  sales: number
}

export interface RetentionWeek {
  label: string
  dots: number[]
}
